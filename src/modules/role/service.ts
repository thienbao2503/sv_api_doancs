import { HttpException } from "@core/exceptions";
import database from "@core/config/database";
import { checkExist } from "@core/utils/checkExist";
import messages from "@core/config/constants";
import { IModal } from "./model";
import { RowDataPacket } from "mysql2";



class Services {
    private tableName = 'tbl_roles';

    public search = async (query: { page?: number; limit?: number; name?: string; publish?: number }, user_id: number) => {
        try {
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const offset = (page - 1) * limit;

            let whereClause = 'WHERE 1=1';

            if (query.name) {
                whereClause += ` AND name LIKE %${query.name}%`;
            }

            if (query.publish !== undefined) {
                whereClause += ` AND publish = ${query.publish}`;
            }

            whereClause += ` AND user_id = ${user_id}`;


            // Get total records for pagination
            const countQuery = `SELECT COUNT(*) as total FROM ${this.tableName} ${whereClause}`;
            console.log(countQuery);

            const [totalResult] = await database.executeQuery(countQuery) as RowDataPacket[];
            const total = totalResult.total;

            // Get records with pagination
            const selectQuery = `
                SELECT r.id, r.name, r.publish, value, r.created_at, r.updated_at 
                FROM ${this.tableName} r 
                LEFT JOIN tbl_role_config rc ON r.id = rc.role_id 
                ${whereClause} 
                ORDER BY created_at DESC 
                LIMIT ${limit} OFFSET ${offset} 
            `;

            console.log(selectQuery);


            const result = await database.executeQuery(selectQuery) as RowDataPacket[];

            if (result.length == 0) return new HttpException(400, messages.NOT_FOUND);

            return {
                data: result.map((item) => { return { ...item, value: JSON.parse(item.value) } }),
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
            // 1. Check if role name exists
            const exist = await checkExist(this.tableName, 'name', model.name);
            if (exist) return new HttpException(400, messages.NAME_EXISTED, 'name');

            // 2. Create new role
            const queryInsert = `
                INSERT INTO ${this.tableName} 
                (name, publish,user_id ,created_at, updated_at)
                VALUES (?, ?, ? , NOW(), NOW())
            `;

            const values = [
                model.name,
                model.publish || 1,
                user_id
            ];

            const res = await database.executeQuery(queryInsert, values) as RowDataPacket;

            const valunConfig = [
                {
                    type: 'READ',
                    isAllowed: 0
                },
                {
                    type: 'CREATE',
                    isAllowed: 0
                },
                {
                    type: 'UPDATE',
                    isAllowed: 0
                },
                {
                    type: 'DELETE',
                    isAllowed: 0
                },
            ]
            const insertConfig = `
                INSERT INTO tbl_role_config (role_id, value, created_at)
                VALUES (?, ?, NOW())
            `;
            await database.executeQuery(insertConfig, [res.insertId, JSON.stringify(valunConfig)]) as RowDataPacket;
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
            // Kiểm tra tồn tại vai trò với id và user_id
            const checkQuery = `SELECT id FROM ${this.tableName} WHERE id = ?`;
            const checkResult = await database.executeQuery(checkQuery, [id]) as RowDataPacket[];
            if (checkResult.length === 0) return new HttpException(400, messages.NOT_FOUND);

            // Kiểm tra trùng tên (nếu tên thay đổi)
            if (model.name) {
                const exist = await checkExist(this.tableName, 'name', model.name, id);
                if (exist) return new HttpException(400, messages.NAME_EXISTED, 'name');
            }



            // Cập nhật vai trò
            const updateQuery = `
                UPDATE ${this.tableName}
                SET name = ?, publish = ?, updated_at = NOW()
                WHERE id = ? 
            `;
            const values = [
                model.name,
                model.publish,
                id
            ];
            await database.executeQuery(updateQuery, values);
            return {
                message: messages.UPDATE_SUCCESS,
            };
        } catch (error) {
            return new HttpException(400, messages.UPDATE_FAILED);
        }
    }

    public delete = async (id: number) => {
        try {
            // Kiểm tra tồn tại vai trò với id và user_id
            const checkQuery = `SELECT id FROM ${this.tableName} WHERE id = ?`;
            const checkResult = await database.executeQuery(checkQuery, [id]) as RowDataPacket[];
            if (checkResult.length === 0) return new HttpException(400, messages.NOT_FOUND);

            // Xoá vai trò
            const deleteQuery = `DELETE FROM ${this.tableName} WHERE id = ?`;
            await database.executeQuery(deleteQuery, [id]);
            return {
                message: messages.DELETE_SUCCESS,
            };
        } catch (error) {
            return new HttpException(400, messages.DELETE_FAILED);
        }
    }
    public updateConfig = async (id: number, model: any) => {
        try {
            // Kiểm tra tồn tại vai trò với id và user_id
            const checkRole = await checkExist(this.tableName, 'id', id);
            if (!checkRole) return new HttpException(400, messages.NOT_FOUND);
            // Cập nhật vai trò
            const updateQuery = `
                UPDATE tbl_role_config 
                SET value =?, created_at = NOW() 
                WHERE role_id =? 
            `;
            const values = [
                model,
                id
            ];
            await database.executeQuery(updateQuery, values);
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