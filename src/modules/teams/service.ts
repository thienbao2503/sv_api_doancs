import { HttpException } from "@core/exceptions";
import database from "@core/config/database";
import { checkExist } from "@core/utils/checkExist";
import messages from "@core/config/constants";
import { IModal } from "./model";
import { RowDataPacket } from "mysql2";



class Services {
    private tableName = 'tbl_project_team';

    // add team to project
    public create = async (email: string, role_id: number, created_id: number) => {
        try {
            // 1. Kiểm tra user tồn tại
            const existUser = await checkExist("tbl_users", "email", email);
            if (!existUser) return new HttpException(400, `Người dùng không tồn tại`);

            // 2. Kiểm tra role tồn tại
            const existRole = await checkExist("tbl_roles", "id", role_id);
            if (!existRole) return new HttpException(400, messages.ROLE_NOT_EXISTED);

            // 3. Thêm user vào project
            const query = `
                INSERT INTO ${this.tableName} (user_id, role_id, created_id, created_at, updated_at)
                VALUES (?, ?, ?, NOW(), NOW())
            `;
            await database.executeQuery(query, [existUser.id, role_id, created_id]);
            return {
                message: messages.CREATE_SUCCESS,
            };
        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.CREATE_FAILED);
        }
    };
    // update role of user in project
    public update = async (role_id: number, id: number) => {
        try {
            // 1. Kiểm tra role tồn tại
            const existRole = await checkExist("tbl_roles", "id", role_id);
            if (!existRole) return new HttpException(400, messages.ROLE_NOT_EXISTED);
            // update theo id của tbl_project_team
            const query = `
                UPDATE ${this.tableName}
                SET role_id = ?, updated_at = NOW()
                WHERE id = ?
            `;
            await database.executeQuery(query, [role_id, id]);
            return {
                message: messages.UPDATE_SUCCESS,
            };

        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.UPDATE_FAILED);
        }
    }

    // delete useser in project
    public delete = async (id: number) => {
        try {
            // kiểm tra id có tồn tại trong bảng tbl_project_team
            const existUser = await checkExist(this.tableName, "id", id);
            if (!existUser) return new HttpException(400, `Người dùng không tồn tại trong dự án`);
            // update isDelete
            const query = `
                UPDATE ${this.tableName}
                SET isDelete = 1, updated_at = NOW()
                WHERE id = ?
            `;
            await database.executeQuery(query, [id]);
            return {
                message: messages.DELETE_SUCCESS,
            };

        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.DELETE_FAILED);
        }


    }

    // get team in project
    public search = async (created_id: number, query: { role_id?: number, search?: string, limit?: number, page?: number }) => {
        try {

            const limit = query.limit || 10;
            const page = query.page || 1;
            const offset = (page - 1) * limit;
            // WHERE clause & base values
            let whereClause = 'WHERE 1=1';

            if (query.search) {
                whereClause += ` AND p.name LIKE %${query.search}%`;

            }

            if (query.role_id) {
                whereClause += ` AND r.id = ${query.role_id}%`;
            }

            whereClause += ` AND created_id = ${created_id}`;


            const countQuery = `SELECT COUNT(p.id) as total FROM ${this.tableName} p ${whereClause}`;

            const [countResult] = await database.executeQuery(countQuery) as RowDataPacket[];
            const total = countResult?.total || 0;

            const selectQuery = `
                SELECT 
                    p.id, p.name, p.description, p.created_at, p.updated_at, 
                    u.id as user_id, u.email as user_email, 
                    r.id as role_id, r.name as role_name 
                FROM ${this.tableName} p 
                JOIN tbl_users u ON p.user_id = u.id 
                JOIN tbl_roles r ON p.role_id = r.id 
                ${whereClause} 
                ORDER BY p.created_at DESC 
                LIMIT ${limit} OFFSET ${offset} 
            `;

            const result = await database.executeQuery(selectQuery) as RowDataPacket[];

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
            console.log(error);
            return new HttpException(400, messages.FAILED);
        }
    }

}

export default Services;