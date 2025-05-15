import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendResponse } from '@core/utils';
import { checkExist } from '@core/utils/checkExist';
import errorMessages from '@core/config/constants';

class AuthMiddleware {
    public static authorization(isCheckPermission?: boolean) {
        isCheckPermission = false;
        if (isCheckPermission == false) {
            return this.authorizationWithPermissionCheck(false);
        } else {
            return this.authorizationWithPermissionCheck(true);
        }
    }
    public static authorizationWithPermissionCheck = (isCheckPermission: boolean) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            // console.log(req.header('Authorization') + 'optech');
            if (!token) {
                return sendResponse(res, 401, 'token is required');
            }
            // const module_id: number = parseInt(req.header("module_id") as string);
            // const action: string = req.header("action") as string;
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
                // console.log(decoded);
                if (decoded && typeof decoded === 'object' && 'id' in decoded) {
                    const check = await checkExist('tbl_users', 'id', decoded.id.toString());
                    if (!check) {
                        return sendResponse(res, 401, 'user not found');
                    }
                    if (check[0].active === 0) {
                        return sendResponse(res, 423, errorMessages.USER_BLOCKED);
                    }
                    req.id = decoded.id;
                    // req.seller_id = check[0].seller_id;
                    // const getRole = await checkExist('user_role', 'user_id', decoded.id.toString());
                    // if (getRole == false) {
                    // } else {
                    //     req.role_id = getRole[0].role_id;
                    // }
                    // if (isCheckPermission == true) {
                    //     const permissionService = new PermissionService();
                    //     const permission = await permissionService.checkPermissionUserId(decoded.id, module_id, action);
                    //     if (!permission) {
                    //         return sendResponse(res, 403, errorMessages.PERMISSION_DENIED);
                    //     }
                    // }
                    next();
                } else {
                    return sendResponse(res, 403, 'invalid token');
                }
            } catch (error) {
                return sendResponse(res, 401, error instanceof Error ? error.message : 'token verification failed');
            }
        };
    };


    public static checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
        if (req.id !== 1) {
            return sendResponse(res, 400, 'Bạn không có quyền thực hiện thay đổi này', null, 'id');
        }
        next()
    }
}

export default AuthMiddleware;
