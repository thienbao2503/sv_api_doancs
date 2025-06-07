import { HttpException } from "@core/exceptions";
import database from "@core/config/database";
import { checkExist } from "@core/utils/checkExist";
import messages from "@core/config/constants";
import { IModal } from "./model";
import { RowDataPacket } from "mysql2";
import { UploadImage } from "@core/utils/upload.image";
import path from "path";

import fs from 'fs/promises';



class Services {
    private tableName = 'tbl_tasks';

    public search = async (query: { page?: number; limit?: number; name?: string; publish?: number, start_time?: Date, end_time?: Date, project_id?: number }, user_id: number) => {
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

            // whereClause += ' AND p.user_id =?';
            whereClause += ` AND (p.user_id = ? OR p.id IN (SELECT project_id FROM tbl_project_team WHERE user_id = ?))`;

            values.push(user_id, user_id);

            // Get total records for pagination
            const countQuery = `SELECT COUNT(DISTINCT t.id) as total 
                FROM ${this.tableName} t  
                LEFT JOIN tbl_projects p ON t.project_id = p.id 
                ${whereClause}`;
            const [totalResult] = await database.executeQuery(countQuery, values) as RowDataPacket[];
            const total = totalResult.total;

            // Get records with pagination
            const selectQuery = `
                SELECT DISTINCT t.id, t.name,p.name as project_name ,t.project_id, t.description, t.priority, t.status, t.progress_contractor,t.progress_supervisor, t.start_time, t.end_time, t.publish, t.created_at, t.updated_at ,
                (
                    SELECT JSON_ARRAYAGG(ta.role_id) 
                    FROM tbl_task_assignees ta 
                    WHERE ta.task_id = t.id 
                ) AS roleIDs ,
                 (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT('image_id', tci.id, 'image_url', tci.image_url, 'created_at', tci.created_at)
                    ) 
                    FROM task_completed_images tci 
                    WHERE tci.task_id = t.id 
                ) AS completed_images 
                FROM ${this.tableName} t 
                LEFT JOIN tbl_projects p ON t.project_id = p.id 
                ${whereClause} 
                ORDER BY created_at DESC 
                LIMIT ${limit} OFFSET ${offset} 
            `;

            const result = await database.executeQuery(selectQuery, values) as RowDataPacket[];

            return {
                data: result,
                pagination: {
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                }
            };

        } catch (error) {
            console.log(error);

            return new HttpException(400, messages.NOT_FOUND);
        }
    }
    public create = async (model: IModal) => {
        try {
            // 1. Check if project exists
            const exist = await checkExist("tbl_projects", 'id', model.project_id);
            if (!exist) return new HttpException(400, `Dự án ${messages.NOT_EXISTED}`, 'project_id');

            // 2. Create new task
            const queryInsert = `
            INSERT INTO ${this.tableName} 
            (project_id, name, description, priority, status, start_time, end_time, publish, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
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
            await database.executeQuery(queryInsert, values) as RowDataPacket;

            // const taskId = res.insertId;



            return {
                message: messages.CREATE_SUCCESS,
            };

        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.CREATE_FAILED);
        }
    }
    // Cập nhật tiến độ bên thi công:
    public updateContractorProgress = async (taskId: number, progress: number) => {
        try {
            if (progress < 0 || progress > 100) {
                return new HttpException(400, 'Tiến độ không hợp lệ. Phải từ 0 đến 100');
            }

            const exist = await checkExist(this.tableName, 'id', taskId);
            if (!exist) return new HttpException(400, `Nhiệm vụ ${messages.NOT_EXISTED}`);

            const query = `
            UPDATE ${this.tableName}
            SET progress_contractor = ?, updated_at = NOW()
            WHERE id = ?
        `;
            await database.executeQuery(query, [progress, taskId]);

            return {
                message: 'Cập nhật tiến độ bên thi công thành công',
            };
        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.UPDATE_FAILED);
        }
    }
    // Cập nhật tiến độ bên giám sát + kiểm tra nếu đủ 100% thì set status = 2:
    public updateSupervisorProgress = async (taskId: number, progress: number) => {
        try {
            if (progress < 0 || progress > 100) {
                return new HttpException(400, 'Tiến độ không hợp lệ. Phải từ 0 đến 100');
            }

            const exist = await checkExist(this.tableName, 'id', taskId);
            if (!exist) return new HttpException(400, `Nhiệm vụ ${messages.NOT_EXISTED}`);

            // Lấy lại tiến độ thi công hiện tại
            const [rows] = await database.executeQuery(
                `SELECT progress_contractor FROM ${this.tableName} WHERE id = ? LIMIT 1`,
                [taskId]
            ) as RowDataPacket[];

            const contractorProgress = rows?.progress_contractor ?? 0;

            const status = progress === 100 && contractorProgress === 100 ? 2 : 1;

            const query = `
            UPDATE ${this.tableName}
            SET progress_supervisor = ?, status = ${status} ,updated_at = NOW()
            WHERE id = ?
        `;
            await database.executeQuery(query, [progress, taskId]);

            return {
                message: `Cập nhật tiến độ bên giám sát thành công${status ? ', nhiệm vụ đã hoàn thành' : ''}`,
            };
        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.UPDATE_FAILED);
        }
    }

    // api phân việc

    public assignTask = async (taskId: number, roleIDs: number[]) => {
        try {
            if (roleIDs.length === 0) {
                // Nếu gửi mảng rỗng thì xóa hết các role cũ trong task
                await database.executeQuery("DELETE FROM tbl_task_assignees WHERE task_id = ?", [taskId]);
                return;
            }

            // 1. Kiểm tra tất cả roleIDs có tồn tại không
            const placeholders = roleIDs.map(() => '?').join(',');
            const checkRolesQuery = `SELECT id FROM tbl_roles WHERE id IN (${placeholders})`;
            const rolesRes = await database.executeQuery(checkRolesQuery, roleIDs) as RowDataPacket[];
            const validRoleIDs = rolesRes.map((item: any) => item.id);

            // Nếu có roleID không tồn tại, trả lỗi
            const notFound = roleIDs.find(id => !validRoleIDs.includes(id));
            if (notFound !== undefined) {
                return new HttpException(400, `Vai trò ${messages.NOT_EXISTED}`, 'roleIDs');
            }

            // 2. Xóa tất cả các role cũ KHÔNG có trong roleIDs
            const deleteQuery = `
            DELETE FROM tbl_task_assignees 
            WHERE task_id = ? AND role_id NOT IN (${placeholders})
        `;
            await database.executeQuery(deleteQuery, [taskId, ...roleIDs]);

            // 3. Thêm mới các role chưa có
            const existingRolesQuery = `
            SELECT role_id FROM tbl_task_assignees 
            WHERE task_id = ? AND role_id IN (${placeholders})
        `;
            const existing = await database.executeQuery(existingRolesQuery, [taskId, ...roleIDs]) as RowDataPacket[];
            const existingRoleIDs = existing.map((item: any) => item.role_id);

            const newRoleIDs = roleIDs.filter(id => !existingRoleIDs.includes(id));

            if (newRoleIDs.length > 0) {
                const values = newRoleIDs.map(id => `(${id}, ${taskId})`).join(',');
                const insertQuery = `
                INSERT INTO tbl_task_assignees (role_id, task_id)
                VALUES ${values}
            `;
                await database.executeQuery(insertQuery);
            }

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
            // 1. Kiểm tra xem nhiệm vụ có tồn tại không
            const exist = await checkExist(this.tableName, 'id', id);
            if (!exist) return new HttpException(400, `Nhiệm vụ ${messages.NOT_EXISTED}`);

            // 2. Cập nhật trạng thái nhiệm vụ thành 3 (Huỷ)
            const queryUpdateStatus = `
            UPDATE ${this.tableName}
            SET status = 3
            WHERE id = ?
        `;
            await database.executeQuery(queryUpdateStatus, [id]);

            return {
                message: 'Huỷ nhiệm vụ thành công',
            };
        } catch (error) {
            return new HttpException(400, 'Huỷ nhiệm vụ thất bại');
        }
    }

    public uploadImages = async (taskId: number, files: Express.Multer.File[]) => {
        try {
            const exist = await checkExist(this.tableName, 'id', taskId);
            if (!exist) return new HttpException(400, `Nhiệm vụ ${messages.NOT_EXISTED}`);

            const UPLOAD_IMAGE_PATH = '../../../uploads/tasks';

            // Upload all images and get paths
            const uploadedPaths = await UploadImage.uploadMultipleImages(
                `task_${taskId}`,
                files,
                UPLOAD_IMAGE_PATH
            );

            if (uploadedPaths.length === 0) {
                return new HttpException(400, 'Không thể tải lên ảnh');
            }

            const values = uploadedPaths.map(path => [taskId, path, new Date()]);

            // Tạo placeholders: 1 phần tử 3 dấu hỏi cho mỗi ảnh
            const placeholders = values.map(() => '(?, ?, ?)').join(', ');

            // Flatten mảng values
            const flattenedValues = values.flat();

            const query = `
                INSERT INTO task_completed_images 
                (task_id, image_url, created_at)
                VALUES ${placeholders}
                `;

            await database.executeQuery(query, flattenedValues);

            return {
                message: `Đã tải lên ${uploadedPaths.length} ảnh thành công`,
                data: uploadedPaths
            };
        } catch (error) {
            console.log(error);
            return new HttpException(400, 'Tải ảnh thất bại');
        }
    }

    public deleteImage = async (taskId: number, imageId: number) => {
        try {
            console.log('taskId:', taskId, 'imageId:', imageId);

            const exist = await checkExist(this.tableName, 'id', taskId);
            if (!exist) return new HttpException(400, `Nhiệm vụ ${messages.NOT_EXISTED}`);

            const imageExist = await checkExist('task_completed_images', 'id', imageId);
            if (!imageExist) return new HttpException(400, `Ảnh ${messages.NOT_EXISTED}`, 'imageId');

            // Lấy đường dẫn ảnh từ CSDL
            const result = await database.executeQuery(
                `SELECT image_url FROM task_completed_images WHERE id = ? AND task_id = ? LIMIT 1`,
                [imageId, taskId]
            ) as RowDataPacket;

            const imageRow = result[0]?.image_url;
            console.log('Image Result:', imageRow);
            if (!imageRow) {
                return new HttpException(400, `Ảnh ${messages.NOT_EXISTED}`, 'imageId');
            }

            const imagePath = imageRow;

            // Xoá ảnh khỏi hệ thống file
            const fullPath = path.join(__dirname, '../../../uploads', imagePath);
            try {
                await fs.unlink(fullPath);
            } catch (err) {
                console.error('Error deleting file:', err);
                return new HttpException(400, 'Ảnh không tồn tại trên hệ thống file', 'imageId');
            }

            // Xoá ảnh khỏi CSDL
            await database.executeQuery(
                `DELETE FROM task_completed_images WHERE id = ? AND task_id = ?`,
                [imageId, taskId]
            );

            return {
                message: 'Xoá ảnh thành công',
                data: {
                    taskId,
                    imageId,
                    image_url: imagePath
                }
            };
        } catch (error) {
            console.log(error);
            return new HttpException(400, 'Xoá ảnh thất bại');
        }
    }


}

export default Services;