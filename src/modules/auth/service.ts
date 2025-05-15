import { HttpException } from "@core/exceptions";
import bcryptjs from 'bcryptjs';
import database from "@core/config/database";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { checkExist } from "@core/utils/checkExist";
import messages from "@core/config/constants";
import { IModal } from "./model";



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
            await database.executeQuery(queryInsert, values);
            return {
                message: 'Đăng ký tài khoản thành công',
            };

        } catch (error) {
            console.log(error);

            return new HttpException(400, messages.REGISTER_FAILED);
        }
    }

    public login = async (model: IModal) => {
        try {
            // 1. Kiểm tra email
            const user = (await checkExist(this.tableName, 'email', model.email))[0];
            if (!user) return new HttpException(400, messages.EMAIL_NOT_EXISTED, 'email');

            // 2. Kiểm tra mật khẩu
            const isValidPassword = await bcryptjs.compare(model.password, user.password);
            if (!isValidPassword) return new HttpException(400, messages.PASSWORD_INCORRECT);

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

}

export default Services;