import { HttpException } from "@core/exceptions";
import database from "@core/config/database";
import { checkExist } from "@core/utils/checkExist";
import messages from "@core/config/constants";
import { IModal } from "./model";
import { RowDataPacket } from "mysql2";



class Services {
    private tableName = 'tbl_projects';

    // Search for projects
    // Search for projects
    public search = async (
        query: { page?: number; limit?: number; name?: string; status?: number },
        user_id: number
    ) => {
        try {
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const offset = (page - 1) * limit;

            // WHERE clause & base values
            let whereClause = 'WHERE 1=1';
            const baseValues: any[] = [];

            if (query.name) {
                whereClause += ' AND p.name LIKE ?';
                baseValues.push(`%${query.name}%`);
            }

            if (typeof query.status === 'number') {
                whereClause += ' AND p.status = ?';
                baseValues.push(query.status);
            }

            whereClause += ` AND (p.user_id = ? OR p.id IN (SELECT project_id FROM tbl_project_team WHERE user_id = ?))`;
            baseValues.push(user_id, user_id);

            // 1. COUNT query
            // COUNT query
            const countQuery = `SELECT COUNT(DISTINCT p.id) as total FROM ${this.tableName} p ${whereClause}`;

            const [countResult] = await database.executeQuery(countQuery, baseValues) as RowDataPacket[];
            const total = countResult?.total || 0;

            const selectQuery = `
                SELECT DISTINCT 
                    p.id, p.name, p.description, p.user_id, p.start_date, p.end_date, 
                    (p.user_id = ${user_id}) as isMe,  
                    p.status, p.created_at, p.updated_at, 
                    (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'user_id', pt.user_id,
                                'full_name', u.full_name,
                                'email', u.email,
                                'role_id', pt.role_id,
                                'role_name', r.name
                            )
                        )
                        FROM tbl_project_team pt 
                        LEFT JOIN tbl_users u ON pt.user_id = u.id 
                        LEFT JOIN tbl_roles r ON pt.role_id = r.id 
                        WHERE pt.project_id = p.id 
                    ) AS teams,
                    (SELECT COUNT(*) FROM tbl_tasks t WHERE t.project_id = p.id AND t.status = 1) AS total_doing,
                    (SELECT COUNT(*) FROM tbl_tasks t WHERE t.project_id = p.id AND t.status = 2) AS total_done
                FROM tbl_projects p 
                ${whereClause} 
                ORDER BY p.created_at DESC 
                LIMIT ${limit} OFFSET ${offset} 
            `;

            const result = await database.executeQuery(selectQuery, baseValues) as RowDataPacket[];

            return {
                data: result,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            };

        } catch (error) {
            console.error('[Project Search Error]', error);
            return new HttpException(400, messages.NOT_FOUND);
        }
    };







    // getbyid
    public getById = async (id: number) => {
        try {
            const query = `
                SELECT p.id, p.name, p.description, p.user_id, p.start_date, p.end_date, p.status, p.created_at, p.updated_at, 
                pr.goal, pr.budget, pr.currency, pr.duration 
                FROM ${this.tableName} p 
                LEFT JOIN tbl_project_requests pr ON p.id = pr.project_id 
                WHERE p.id =?
            `;
            const result = await database.executeQuery(query, [id]) as RowDataPacket[];
            if (result.length === 0) return new HttpException(400, messages.NOT_FOUND);

            // Lấy danh sách team members của project này
            const teamQuery = `
                SELECT 
                    pt.user_id, u.full_name, u.email, pt.role_id, r.name as role_name
                FROM tbl_project_team pt
                LEFT JOIN tbl_users u ON pt.user_id = u.id
                LEFT JOIN tbl_roles r ON pt.role_id = r.id
                WHERE pt.project_id = ?
            `;
            const teams = await database.executeQuery(teamQuery, [id]) as RowDataPacket[];

            return {
                data: { ...result[0], budget: Number(result[0].budget), teams },
            };
        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.NOT_FOUND);
        }
    }

    public create = async (model: IModal, user_id: number) => {
        try {
            // 1. Check if project name exists
            const exist = await checkExist(this.tableName, 'name', model.name);
            if (exist) return new HttpException(400, messages.NAME_EXISTED, 'name');

            // 2. Create new project
            const queryProject = `
                INSERT INTO ${this.tableName} 
                (name, description, user_id, start_date, end_date, status, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
            `;

            const projectValues = [
                model.name,
                model.description,
                user_id,
                model.start_date,
                model.end_date,
                model.status || 1,
            ];

            const result = await database.executeQuery(queryProject, projectValues) as RowDataPacket[0];

            // 3. Create project request for the new project
            const projectId = result.insertId;
            const queryInsertRequest = `
                INSERT INTO tbl_project_requests 
                (project_id, goal, budget, currency, duration)
                VALUES (?, ?, ?, ?, ?)
            `;
            const requestValues = [
                projectId,
                model.goal,
                model.budget,
                model.currency,
                model.duration,
            ];

            await database.executeQuery(queryInsertRequest, requestValues);

            return {
                message: messages.CREATE_SUCCESS,
            };

        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.CREATE_FAILED);
        }
    }

    // Update a project
    public update = async (model: IModal, id: number) => {
        try {
            // 1. Kiểm tra project tồn tại
            const exist = await checkExist(this.tableName, 'id', id);
            if (!exist) {
                return new HttpException(400, messages.NOT_FOUND);
            }

            // 2. Cập nhật tbl_projects nếu có field tương ứng
            const setProject: string[] = [];
            const valuesProject: any[] = [];

            if (model.name !== undefined) {
                setProject.push('name = ?');
                valuesProject.push(model.name);
            }
            if (model.description !== undefined) {
                setProject.push('description = ?');
                valuesProject.push(model.description);
            }
            if (model.user_id !== undefined) {
                setProject.push('user_id = ?');
                valuesProject.push(model.user_id);
            }
            if (model.start_date !== undefined) {
                setProject.push('start_date = ?');
                valuesProject.push(model.start_date);
            }
            if (model.end_date !== undefined) {
                setProject.push('end_date = ?');
                valuesProject.push(model.end_date);
            }
            if (model.status !== undefined) {
                setProject.push('status = ?');
                valuesProject.push(model.status);
            }

            if (setProject.length > 0) {
                setProject.push('updated_at = NOW()');
                const queryProject = `
                    UPDATE ${this.tableName}
                    SET ${setProject.join(', ')}
                    WHERE id = ?
                `;
                valuesProject.push(id);
                await database.executeQuery(queryProject, valuesProject);
            }

            // 3. Cập nhật tbl_project_requests nếu có field tương ứng
            const setRequest: string[] = [];
            const valuesRequest: any[] = [];

            if (model.goal !== undefined) {
                setRequest.push('goal = ?');
                valuesRequest.push(model.goal);
            }
            if (model.budget !== undefined) {
                setRequest.push('budget = ?');
                valuesRequest.push(model.budget);
            }
            if (model.currency !== undefined) {
                setRequest.push('currency = ?');
                valuesRequest.push(model.currency);
            }
            if (model.duration !== undefined) {
                setRequest.push('duration = ?');
                valuesRequest.push(model.duration);
            }

            if (setRequest.length > 0) {
                const queryRequest = `
                    UPDATE tbl_project_requests
                    SET ${setRequest.join(', ')}
                    WHERE project_id = ?
                `;
                valuesRequest.push(id);
                await database.executeQuery(queryRequest, valuesRequest);
            }

            return {
                message: messages.UPDATE_SUCCESS,
            };

        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.UPDATE_FAILED);
        }
    }

    // Delete a project
    public delete = async (id: number) => {
        try {
            // 1. Kiểm tra project tồn tại
            const exist = await checkExist(this.tableName, 'id', id);
            if (!exist) {
                return new HttpException(400, messages.NOT_FOUND);
            }
            const query = `
                DELETE FROM ${this.tableName}
                WHERE id =?
            `;
            const queryRequest = `
                DELETE FROM tbl_project_requests
                WHERE project_id =?
            `;
            const queryTeam = `
                DELETE FROM tbl_project_team
                WHERE project_id =?
            `;
            await database.executeQuery(queryTeam, [id]);
            await database.executeQuery(queryRequest, [id]);
            await database.executeQuery(query, [id]);
            return {
                message: messages.DELETE_SUCCESS,
            };
        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.DELETE_FAILED);
        }
    }

    // add team to project
    public addTeam = async (project_id: number, email: string, role_id?: number) => {
        try {
            // 1. Kiểm tra project tồn tại
            const exist = await checkExist(this.tableName, "id", project_id);
            if (!exist) return new HttpException(400, messages.NOT_FOUND);

            // 2. Kiểm tra role tồn tại
            if (role_id !== undefined) {
                const existRole = await checkExist("tbl_roles", "id", role_id);
                if (!existRole) return new HttpException(400, messages.ROLE_NOT_EXISTED);
            }

            // 3. Lấy user_id từ email
            const userQuery = `SELECT id, full_name FROM tbl_users WHERE email = ?`;
            const userResult = await database.executeQuery(userQuery, [email]) as RowDataPacket[];
            if (userResult.length === 0) return new HttpException(400, `Người dùng không tồn tại`);
            if (userResult[0].id == exist[0].user_id) return new HttpException(400, `Người dùng ${userResult[0].full_name} đã có trong dự án`);

            const user_id = userResult[0].id;

            // 4. Kiểm tra user đã tồn tại trong project chưa
            const existsInProject = await database.executeQuery(
                `SELECT u.full_name 
                FROM tbl_project_team pt 
                LEFT JOIN tbl_users u ON pt.user_id = u.id 
                WHERE pt.project_id = ? AND pt.user_id = ?`,
                [project_id, user_id]
            ) as RowDataPacket[];

            if (existsInProject.length > 0) {
                return new HttpException(400, `Người dùng ${existsInProject[0].full_name} đã có trong dự án`);
            }

            // 5. Thêm vào DB
            const query = `
                INSERT INTO tbl_project_team
                (project_id, user_id, role_id, created_at, updated_at)
                VALUES (?, ?, ?, NOW(), NOW())
            `;
            await database.executeQuery(query, [project_id, user_id, role_id || null]);

            return {
                message: messages.CREATE_SUCCESS,
            };
        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.CREATE_FAILED);
        }
    };

    // update role of user in project
    public updateRole = async (project_id: number, user_id: number, role_id: number) => {
        try {
            // 1. Kiểm tra project tồn tại
            const exist = await checkExist(this.tableName, "id", project_id);
            if (!exist) return new HttpException(400, messages.NOT_FOUND);
            // 2. Kiểm tra role tồn tại
            const existRole = await checkExist("tbl_roles", "id", role_id);
            if (!existRole) return new HttpException(400, messages.ROLE_NOT_EXISTED);
            // 3. Kiểm tra user tồn tại
            const existUser = await checkExist("tbl_users", "id", user_id)
            if (!existUser) {
                return new HttpException(400, `Người dùng không tồn tại`);
            }
            // 4. Kiểm tra user đã tồn tại trong project chưa
            const existsInProject = await database.executeQuery(
                `SELECT u.full_name
                FROM tbl_project_team pt
                LEFT JOIN tbl_users u ON pt.user_id = u.id
                WHERE pt.project_id = ? AND pt.user_id = ?`,
                [project_id, user_id]
            ) as RowDataPacket[];
            if (existsInProject.length === 0) {
                return new HttpException(400, `Người dùng ${existsInProject[0].full_name} chưa có trong dự án`);
            }
            // 5. Cập nhật role
            const query = `
                UPDATE tbl_project_team
                SET role_id =?, updated_at = NOW()
                WHERE project_id =? AND user_id =?
            `;
            await database.executeQuery(query, [role_id, project_id, user_id]);
            return {
                message: messages.UPDATE_SUCCESS,
            };

        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.UPDATE_FAILED);
        }
    }

    // delete useser in project
    public deleteUser = async (project_id: number, user_id: number) => {
        try {
            // 1. Kiểm tra project tồn tại
            const exist = await checkExist(this.tableName, "id", project_id);
            if (!exist) return new HttpException(400, messages.NOT_FOUND);
            // 2. Kiểm tra user tồn tại
            const existUser = await checkExist("tbl_users", "id", user_id)
            if (!existUser) {
                return new HttpException(400, `Người dùng không tồn tại`);
            }
            // 3. Kiểm tra user đã tồn tại trong project chưa
            const existsInProject = await database.executeQuery(
                `SELECT u.full_name
                FROM tbl_project_team pt
                LEFT JOIN tbl_users u ON pt.user_id = u.id
                WHERE pt.project_id =? AND pt.user_id =?`,
                [project_id, user_id]
            ) as RowDataPacket[];
            if (existsInProject.length === 0) {
                return new HttpException(400, `Người dùng ${existsInProject[0].full_name} chưa có trong dự án`);
            }
            // 4. Xóa user
            const query = `
                DELETE FROM tbl_project_team
                WHERE project_id =? AND user_id =?
            `;
            await database.executeQuery(query, [project_id, user_id]);
            return {
                message: messages.DELETE_SUCCESS,
            };
        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.DELETE_FAILED);
        }
    }

    // get team in project
    public getTeam = async (user_id: number, project_id: number | undefined) => {
        try {
            console.log(12345678);

            let query = `
                SELECT u.id, u.full_name, u.email, u.phone, u.avatar_url, u.created_at, u.updated_at, r.name as role_name 
                FROM tbl_project_team pt
                LEFT JOIN tbl_users u ON pt.user_id = u.id
                LEFT JOIN tbl_roles r ON pt.role_id = r.id
                WHERE pt.project_id IN (
                    SELECT id FROM tbl_projects WHERE user_id = ?
                )
            `;

            const values: (number | string)[] = [user_id];

            if (project_id !== undefined) {
                query += ` AND pt.project_id = ?`;
                values.push(project_id);
            }

            console.log(query, values);

            const result = await database.executeQuery(query, values) as RowDataPacket[];
            return {
                data: result
            };

        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.FAILED);
        }
    }



}

export default Services;