import { HttpException } from "@core/exceptions";
import database from "@core/config/database";
import { checkExist } from "@core/utils/checkExist";
import messages, { defaultTasksByKey } from "@core/config/constants";
import { IModal } from "./model";
import { RowDataPacket } from "mysql2";



class Services {
    private tableName = 'tbl_projects';


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

            // whereClause += ` AND (p.user_id = ? OR p.id IN (SELECT project_id FROM tbl_project_team WHERE user_id = ?))`;
            whereClause += ` AND (
                p.user_id = ${user_id} 
                OR p.id IN (
                        SELECT t.project_id 
                        FROM tbl_project_team pt 
                        LEFT JOIN tbl_task_assignees ta ON pt.role_id = ta.role_id 
                        LEFT JOIN tbl_tasks t ON ta.task_id = t.id 
                        WHERE pt.user_id = ${user_id} 
                    )
                )`;
            // 1. COUNT query
            // COUNT query
            const countQuery = `SELECT COUNT(DISTINCT p.id) as total FROM ${this.tableName} p ${whereClause}`;

            const [countResult] = await database.executeQuery(countQuery, baseValues) as RowDataPacket[];
            const total = countResult?.total || 0;

            // const selectQuery = `
            //     SELECT DISTINCT 
            //         p.id, p.name, p.description, p.user_id, p.start_date, p.end_date, 
            //         (p.user_id = ${user_id}) as isMe,  
            //         p.status, p.created_at, p.updated_at, 
            //         p.category_id, c.name as category_name, 
            //         (
            //             SELECT JSON_ARRAYAGG(
            //                 JSON_OBJECT(
            //                     'user_id', pt.user_id,
            //                     'full_name', u.full_name,
            //                     'email', u.email,
            //                     'role_id', pt.role_id,
            //                     'role_name', r.name
            //                 )
            //             )
            //             FROM tbl_project_team pt 
            //             LEFT JOIN tbl_users u ON pt.user_id = u.id 
            //             LEFT JOIN tbl_roles r ON pt.role_id = r.id 
            //             WHERE pt.project_id = p.id 
            //         ) AS teams,
            //         (SELECT COUNT(*) FROM tbl_tasks t WHERE t.project_id = p.id AND t.status = 1) AS total_doing,
            //         (SELECT COUNT(*) FROM tbl_tasks t WHERE t.project_id = p.id AND t.status = 2) AS total_done
            //     FROM tbl_projects p 
            //     LEFT JOIN tbl_project_categories c ON p.category_id = c.id 
            //     ${whereClause} 
            //     ORDER BY p.created_at DESC 
            //     LIMIT ${limit} OFFSET ${offset} 
            // `;

            const selectQuery = `
                SELECT DISTINCT 
                    p.id, p.name, p.description, p.user_id, p.start_date, p.end_date, 
                    (p.user_id = ${user_id}) as isMe,  
                    p.status, p.created_at, p.updated_at, 
                    p.category_id, c.name as category_name, 
                    (SELECT COUNT(*) FROM tbl_tasks t WHERE t.project_id = p.id AND t.status = 1) AS total_doing,
                    (SELECT COUNT(*) FROM tbl_tasks t WHERE t.project_id = p.id AND t.status = 2) AS total_done
                FROM tbl_projects p 
                LEFT JOIN tbl_project_categories c ON p.category_id = c.id 
                
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
            SELECT 
                p.id, 
                p.name, 
                p.description, 
                p.user_id, 
                p.start_date, 
                p.end_date, 
                p.status,
                p.goal, 
                p.created_at, 
                p.updated_at, 
                p.category_id, 
                c.name as category_name,
                (
                    SELECT 
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'role_id', ta.role_id,
                                'role_name', r.name
                            )
                        )
                    FROM tbl_tasks t 
                    LEFT JOIN tbl_task_assignees ta ON t.id = ta.task_id 
                    LEFT JOIN tbl_roles r ON ta.role_id = r.id 
                    WHERE t.project_id = p.id AND ta.role_id IS NOT NULL
                ) as roles
            FROM ${this.tableName} p 
            LEFT JOIN tbl_project_categories c ON p.category_id = c.id 
            WHERE p.id = ?
        `;

            const result = await database.executeQuery(query, [id]) as RowDataPacket[];

            if (result.length === 0) return new HttpException(400, messages.NOT_FOUND);

            return {
                data: result[0],
            };
        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.NOT_FOUND);
        }
    }


    public create = async (model: IModal, user_id: number) => {
        try {
            const exist = await checkExist(this.tableName, 'name', model.name);
            if (exist) return new HttpException(400, messages.NAME_EXISTED, 'name');

            const queryProject = `
                INSERT INTO ${this.tableName} 
                (name, description, user_id, start_date, end_date, status, category_id, goal, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            `;

            const projectValues = [
                model.name,
                model.description,
                user_id,
                model.start_date,
                model.end_date,
                model.status || 1,
                model.category_id,
                model.goal || null,
            ];

            const result = await database.executeQuery(queryProject, projectValues) as RowDataPacket[0];
            const projectId = result.insertId;

            if (model.category_id) {
                await this.insertDefaultTasksForProject(projectId, model.category_id);
            }

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
            const exist = await checkExist(this.tableName, 'id', id);
            if (!exist) {
                return new HttpException(400, messages.NOT_FOUND);
            }

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
            if (model.category_id !== undefined) {
                setProject.push('category_id = ?');
                valuesProject.push(model.category_id);
            }
            if (model.goal !== undefined) {
                setProject.push('goal = ?');
                valuesProject.push(model.goal);
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

    private insertDefaultTasksForProject = async (projectId: number, category_id: number) => {
        // 1. Lấy danh sách các task mặc định theo category_id
        const checkCategory = await checkExist('tbl_project_categories', 'id', category_id) as RowDataPacket[];

        const tasks = defaultTasksByKey[checkCategory[0]?.key] || [];
        if (!tasks || tasks.length === 0) return;

        const now = new Date();
        const values: any[] = [];
        const placeholders: string[] = [];

        for (const task of tasks) {
            placeholders.push("(?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?, ?)");
            values.push(
                projectId,
                task.name,
                task.description || '',
                null,                 // deadline
                task.priority || 2,   // priority
                1,                    // status
                null,                 // start_time
                null,                 // end_time
                1,                    // publish
                0,                    // progress_contractor
                0                     // progress_supervisor
            );
        }

        const query = `
        INSERT INTO tbl_tasks 
        (project_id, name, description, deadline, priority, status, start_time, end_time, created_at, updated_at, publish, progress_contractor, progress_supervisor)
        VALUES ${placeholders.join(', ')}
    `;

        await database.executeQuery(query, values);
    };





}

export default Services;
