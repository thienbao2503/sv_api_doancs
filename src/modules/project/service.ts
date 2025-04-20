import { HttpException } from "@core/exceptions";
import database from "@core/config/database";
import { checkExist } from "@core/utils/checkExist";
import messages from "@core/config/constants";
import { IModal } from "./model";
import { RowDataPacket } from "mysql2";



class Services {
    private tableName = 'tbl_projects';

    // Search for projects
    public search = async (query: { page?: number; limit?: number; name?: string; status?: number }, user_id: number) => {
        try {
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const offset = (page - 1) * limit;

            let whereClause = 'WHERE 1=1';
            const values: any[] = [];

            if (query.name) {
                whereClause += ' AND name LIKE ?';
                values.push(`%${query.name}%`);
            }

            if (query.status !== undefined) {
                whereClause += ' AND status = ?';
                values.push(query.status);
            }

            whereClause += ' AND user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?';

            // Get total records for pagination
            const countQuery = `SELECT COUNT(*) as total FROM ${this.tableName} ${whereClause}`;


            // Get records with pagination
            const selectQuery = `
                SELECT id, name, description, user_id, start_date, end_date, status, created_at, updated_at 
                FROM ${this.tableName} 
                ${whereClause}
                
            `;

            values.push(user_id, limit, offset);
            const [totalResult] = await database.executeQuery(countQuery, values) as RowDataPacket[];
            const total = totalResult.total;
            const result = await database.executeQuery(selectQuery, values) as RowDataPacket[];

            if (result.length === 0) return new HttpException(400, messages.NOT_FOUND);

            return {
                data: result,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
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






}

export default Services;