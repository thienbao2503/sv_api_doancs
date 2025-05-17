import { HttpException } from "@core/exceptions";
import database from "@core/config/database";
import { checkExist } from "@core/utils/checkExist";
import messages from "@core/config/constants";
import { IModal } from "./model";
import { RowDataPacket } from "mysql2";



class Services {
    private tableName = 'tbl_roles';

    public search = async (query: { page?: number; limit?: number; name?: string; publish?: number }) => {
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

            // Get total records for pagination
            const countQuery = `SELECT COUNT(*) as total FROM ${this.tableName} ${whereClause}`;
            const [totalResult] = await database.executeQuery(countQuery, values) as RowDataPacket[];
            const total = totalResult.total;

            // Get records with pagination
            const selectQuery = `
                SELECT id, name, publish, created_at, updated_at 
                FROM ${this.tableName} 
                ${whereClause}
                ORDER BY created_at DESC
                LIMIT ${limit} OFFSET ${offset}
            `;

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

    public create = async (model: IModal) => {
        try {
            // 1. Check if role name exists
            const exist = await checkExist(this.tableName, 'name', model.name);
            if (exist) return new HttpException(400, messages.NAME_EXISTED, 'name');

            // 2. Create new role
            const queryInsert = `
                INSERT INTO ${this.tableName} 
                (name, publish, created_at, updated_at)
                VALUES (?, ?, NOW(), NOW())
            `;

            const values = [
                model.name,
                model.publish || 1,
            ];

            await database.executeQuery(queryInsert, values);
            return {
                message: messages.CREATE_SUCCESS,
            };

        } catch (error) {
            return new HttpException(400, messages.CREATE_FAILED);
        }
    }



}

export default Services;