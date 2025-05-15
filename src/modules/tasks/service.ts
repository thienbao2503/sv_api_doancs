import { HttpException } from "@core/exceptions";
import database from "@core/config/database";
import { checkExist } from "@core/utils/checkExist";
import messages from "@core/config/constants";
import { IModal } from "./model";
import { RowDataPacket } from "mysql2";



class Services {
    private tableName = 'tbl_tasks';

    public search = async (query: { page?: number; limit?: number; name?: string; publish?: number, start_time?: Date, end_time?: Date, project_id?: number }) => {
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

            if (query.publish !== undefined) {
                whereClause += ' AND publish = ?';
                values.push(query.publish);
            }
            if (query.start_time) {
                whereClause += ' AND start_time >= ?';
                values.push(query.start_time);
            }
            if (query.end_time) {
                whereClause += ' AND end_time <= ?';
                values.push(query.end_time);
            }
            if (query.project_id !== undefined) {
                whereClause += ' AND project_id = ?';
                values.push(query.project_id);
            }

            // Get total records for pagination
            const countQuery = `SELECT COUNT(*) as total FROM ${this.tableName} ${whereClause}`;
            const [totalResult] = await database.executeQuery(countQuery, values) as RowDataPacket[];
            const total = totalResult.total;

            // Get records with pagination
            const selectQuery = `
                SELECT t.id, t.name,p.name as project_name ,t.project_id, t.description, t.priority, t.status, t.start_time, t.end_time, t.publish, t.created_at, t.updated_at ,
                (
                    SELECT JSON_ARRAYAGG(ta.user_id) 
                    FROM tbl_task_assignees ta 
                    WHERE ta.task_id = t.id 
                ) AS userIDs 
                FROM ${this.tableName} t 
                LEFT JOIN tbl_projects p ON t.project_id = p.id 
                ${whereClause} 
                ORDER BY created_at DESC 
                LIMIT ${limit} OFFSET ${offset} 
            `;

            console.log(selectQuery, values);

            const result = await database.executeQuery(selectQuery, values) as RowDataPacket[];

            if (result.length == 0) return new HttpException(400, messages.NOT_FOUND);

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
    public create = async (model: IModal, userIDs: number[]) => {
        try {
            // 1. Check if role name exists
            const exist = await checkExist("tbl_projects", 'id', model.project_id);
            if (!exist) return new HttpException(400, `Dự án ${messages.NOT_EXISTED}`, 'project_id');
            // 2. Create new task
            const queryInsert = `
                INSERT INTO ${this.tableName} 
                (project_id, name, description, priority, status, start_time, end_time, publish,created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?,?, NOW(), NOW())
            `;
            const values = [
                model.project_id,
                model.name,
                model.description || null,
                model.priority || null,
                model.status || 1,
                model.start_time || null,
                model.end_time || null,
                model.publish ?? 1
            ];
            const res = await database.executeQuery(queryInsert, values) as RowDataPacket;

            // Lấy insertId đúng cách
            const taskId = res.insertId;

            // check mảng user có tồn tại khong userIDs là một mảng các ID người dùng
            for (const userID of userIDs) {
                const existUser = await checkExist("tbl_users", 'id', userID);
                if (!existUser) return new HttpException(400, `Người dùng ${messages.NOT_EXISTED}`, 'userIDs');
                const queryCheckExistUserInTask = `
                    SELECT user_id 
                    FROM tbl_task_assignees 
                    WHERE user_id = ? AND task_id = ?
                `
                const checkExistUserInTask = await database.executeQuery(queryCheckExistUserInTask, [userID, taskId]) as RowDataPacket;

                if (checkExistUserInTask.length > 0) return new HttpException(400, `Người dùng đã ${messages.EXISTED} trong nhiệm vụ này`, 'userIDs');

                const queryInsertUser = `
                    INSERT INTO tbl_task_assignees (user_id, task_id)
                    VALUES (?, ?)
                `;
                await database.executeQuery(queryInsertUser, [userID, taskId]);
            }
            return {
                message: messages.CREATE_SUCCESS,
            };

        } catch (error) {
            console.log(error);

            return new HttpException(400, messages.CREATE_FAILED);
        }
    }
    public update = async (id: number, model: IModal) => {
        try {
            // 1. Check if role name exists
            const exist = await checkExist(this.tableName, 'id', id);
            if (!exist) return new HttpException(400, `Nhiệm vụ ${messages.NOT_EXISTED}`);
            // 2. Update task
            let queryUpdate = `
                UPDATE ${this.tableName}
                SET 
            `;
            const values: any[] = [];

            if (model.name) {
                queryUpdate += `name =?, `;
                values.push(model.name);
            }
            if (model.description) {
                queryUpdate += `description =?, `;
                values.push(model.description);
            }
            if (model.priority) {
                queryUpdate += `priority =?, `;
                values.push(model.priority);
            }
            if (model.status) {
                queryUpdate += `status =?, `;
                values.push(model.status);
            }
            if (model.start_time) {
                queryUpdate += `start_time =?, `;
                values.push(model.start_time);
            }
            if (model.end_time) {
                queryUpdate += `end_time =?, `;
                values.push(model.end_time);
            }
            if (model.publish) {
                queryUpdate += `publish =?, `;
                values.push(model.publish);
            }
            queryUpdate += `updated_at = NOW() WHERE id =?`;
            values.push(id);

            await database.executeQuery(queryUpdate, values);
            // check mảng user có tồn tạ

        } catch (error) {
            return new HttpException(400, messages.UPDATE_FAILED);
        }
    }
    public delete = async (id: number) => {
        try {
            // 1. Check if role name exists
            const exist = await checkExist(this.tableName, 'id', id);
            if (!exist) return new HttpException(400, `Nhiệm vụ ${messages.NOT_EXISTED}`);
            // 2. Delete task
            const queryDelete = `
                DELETE FROM ${this.tableName}
                WHERE id =? 
            `;
            await database.executeQuery(queryDelete, [id]);
            // 3. Delete task assignees
            const queryDeleteTaskAssignees = `
                DELETE FROM tbl_task_assignees
                WHERE task_id =?
            `;
            await database.executeQuery(queryDeleteTaskAssignees, [id]);
            return {
                message: messages.DELETE_SUCCESS,
            };
        } catch (error) {
            return new HttpException(400, messages.DELETE_FAILED);
        }
    }




}

export default Services;