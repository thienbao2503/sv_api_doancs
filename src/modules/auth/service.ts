import { HttpException } from "@core/exceptions";
import bcryptjs from 'bcryptjs';
import database from "@core/config/database";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { checkExist } from "@core/utils/checkExist";
import messages, { DEFAULT_PERMISSIONS } from "@core/config/constants";
import { IModal } from "./model";
import { RowDataPacket } from "mysql2";
import * as twofactor from 'node-2fa';




class Services {
    private tableName = 'tbl_users';

    // const accessToken = jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN });
    // const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });

    public register = async (model: IModal) => {
        try {
            // 1. Kiểm tra số điện thoại đã tồn tại
            const exist = await checkExist(this.tableName, 'phone', model.phone);
            if (exist) return new HttpException(400, messages.PHONE_EXISTED, 'phone');

            // 2. Kiểm tra email đã tồn tại (nếu cần)
            const existEmail = await checkExist(this.tableName, 'email', model.email);
            if (existEmail) return new HttpException(400, messages.EMAIL_EXISTED, 'email');

            // 3. Mã hóa mật khẩu
            const hashedPassword = await bcryptjs.hash(model.password, 10);

            // 4. Tạo người dùng mới
            const queryInsert = `
                INSERT INTO ${this.tableName} 
                (full_name, email, phone, password, active, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, NOW(), NOW())
            `;

            const values = [
                model.full_name,
                model.email,
                model.phone,
                hashedPassword,
                model.active || 'ACTIVE',
            ];
            const result = await database.executeQuery(queryInsert, values) as RowDataPacket;
            const created_id = result.insertId;
            // Gọi tạo quyền mặc định cho user này
            await this.createConfigRole(created_id);

            return {
                message: 'Đăng ký tài khoản thành công',
            };

        } catch (error) {
            console.log(error);

            return new HttpException(400, messages.REGISTER_FAILED);
        }
    }

    private createConfigRole = async (created_id: number) => {


        const queryInsert = `
            INSERT INTO tbl_role_config (role_id, created_id, value, created_at)
            VALUES (?, ?, ?, NOW())
        `;

        const insertValues = [];

        // Lặp qua tất cả quyền mặc định
        for (const roleId in DEFAULT_PERMISSIONS) {
            const value = JSON.stringify(DEFAULT_PERMISSIONS[roleId]);
            insertValues.push([Number(roleId), created_id, value]);
        }

        // Thực hiện insert tất cả quyền 1 lần
        for (const [role_id, created_id, value] of insertValues) {
            await database.executeQuery(queryInsert, [role_id, created_id, value]);
        }
    };

    public login = async (model: IModal) => {
        try {
            // 1. Kiểm tra email
            const user = (await checkExist(this.tableName, 'email', model.email))[0];
            if (!user) return new HttpException(400, messages.EMAIL_NOT_EXISTED, 'email');

            // 2. Kiểm tra mật khẩu
            const isValidPassword = await bcryptjs.compare(model.password, user.password);
            if (!isValidPassword) return new HttpException(400, messages.PASSWORD_INCORRECT, "password");

            // 3. Tạo accessToken và refreshToken
            const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN });
            const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });

            // 4. Trả về thông tin
            return {
                message: messages.LOGIN_SUCCESS,
                data: {
                    user: {
                        email: user.email,
                        full_name: user.full_name,
                        phone: user.phone,
                    },
                    tokens: {
                        access_token: accessToken,
                        refresh_token: refreshToken
                    }
                }
            };

        }
        catch (error) {
            console.error(error);
            return new HttpException(400, messages.LOGIN_FAILED);
        }
    }

    public getUserById = async (id: number) => {
        try {
            const query = `
                SELECT id, full_name, email, phone, is2FA,active, created_at, updated_at
                FROM ${this.tableName}
                WHERE id = ?
            `;
            const result = await database.executeQuery(query, [id]) as RowDataPacket[];
            if (result.length === 0) return new HttpException(400, messages.NOT_FOUND);
            return {
                data: result[0]
            };
        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.NOT_FOUND);
        }
    }

    public updateUser = async (id: number, model: Partial<IModal>) => {
        try {
            // Kiểm tra user tồn tại
            const exist = await checkExist(this.tableName, 'id', id);
            if (!exist) return new HttpException(400, messages.NOT_FOUND);

            // Xây dựng câu truy vấn động
            let query = `UPDATE ${this.tableName} SET `;
            const values: any[] = [];
            if (model.full_name) {
                query += `full_name = ?, `;
                values.push(model.full_name);
            }
            if (model.phone) {
                query += `phone = ?, `;
                values.push(model.phone);
            }
            if (model.email) {
                query += `email =?, `;
                values.push(model.email);
            }

            // Xóa dấu phẩy cuối cùng
            query = query.replace(/, $/, '');
            query += `, updated_at = NOW() WHERE id = ?`;
            values.push(id);

            await database.executeQuery(query, values);

            return {
                message: 'Cập nhật tài khoản thành công',
            };
        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.UPDATE_FAILED);
        }
    }

    public changePassword = async (id: number, model: { code: string; new_password: string }) => {
        try {
            // 1. Kiểm tra user tồn tại
            const users = await checkExist(this.tableName, 'id', id);
            if (!users || users.length === 0) return new HttpException(400, messages.NOT_FOUND);

            const user = users[0];

            // 2. Kiểm tra user có bật 2FA không
            const secret = user.secret_2fa;
            if (!secret) return new HttpException(400, "Người dùng chưa bật 2FA");

            // 3. Xác minh mã 2FA
            const result = twofactor.verifyToken(secret, model.code);
            if (!result || Math.abs(result.delta) > 1) {
                return new HttpException(400, "Mã xác minh không hợp lệ hoặc đã hết hạn", "code");
            }

            // 4. Mã hóa mật khẩu mới
            const hashedPassword = await bcryptjs.hash(model.new_password, 10);

            // 5. Cập nhật mật khẩu
            const query = `
            UPDATE ${this.tableName}
            SET password = ?, updated_at = NOW()
            WHERE id = ?
        `;
            await database.executeQuery(query, [hashedPassword, id]);

            return {
                message: 'Cập nhật mật khẩu thành công',
            };
        } catch (error) {
            console.log(error);
            return new HttpException(400, messages.UPDATE_FAILED);
        }
    }

    public create2FA = async (user_id: number) => {
        try {
            const user = (await checkExist(this.tableName, 'id', user_id))[0];
            if (!user) return new HttpException(400, messages.USER_NOT_EXISTED, 'user');

            const email = user.email;

            let secret = user.secret_2fa || '';
            let qr = null;

            if (secret) {
                // Manually construct the otpauth URI if secret exists
                qr = `otpauth://totp/GET:${encodeURIComponent(email)}?secret=${secret}&issuer=ELEVATE`;
            } else {
                // If not, generate a new secret and URI
                const newSecret = twofactor.generateSecret({
                    name: 'GET',
                    account: email
                });
                secret = newSecret.secret;
                qr = newSecret.uri;

                const queryUpdate = `
                    UPDATE ${this.tableName}
                    SET has_enabled = 1, secret_2fa = ? 
                    WHERE id = ?
                `;
                await database.executeQuery(queryUpdate, [secret, user_id]);
            }

            return {
                message: "Create 2FA successfully",
                data: {
                    qr: qr,
                    secret: secret
                }
            }

        } catch (error) {
            console.error(error);
            return new HttpException(400, "Create 2FA failed");
        }
    }

    public verify2FA = async (id: number, code: string) => {
        try {
            const user = (await checkExist(this.tableName, 'id', id))[0];
            if (!user) return new HttpException(400, messages.USER_NOT_EXISTED, 'user');

            const secret = user.secret_2fa

            if (!secret) return new HttpException(400, "2FA is not enabled for this user");

            const verification = twofactor.verifyToken(secret, code);
            if (!verification) return new HttpException(400, "2FA code is incorrect", "code");

            const queryUpdate = `
                UPDATE ${this.tableName}
                SET is2FA = 1
                WHERE id = ?
            `;
            await database.executeQuery(queryUpdate, [id]);

            return {
                message: "2FA verification successful",
            };
        } catch (error) {
            console.error(error);
            return new HttpException(400, "2FA verification failed");
        }
    }
}

export default Services;