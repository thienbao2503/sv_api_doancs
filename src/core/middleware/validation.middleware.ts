import { HttpException } from "@core/exceptions";
import { sendResponse } from "@core/utils";
import { Logger } from "@core/utils";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

const errorMiddleware = (
    type: any,
    location: 'body' | 'params' | 'query' = 'body',
    skipMissingProperties = false
): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        let data;
        switch (location) {
            case 'body':
                data = req.body;
                break;
            case 'params':
                data = req.params;
                break;
            case 'query':
                data = req.query;
                break;
            default:
                return next(new HttpException(400, 'invalid location'));
        }

        if (!data) {
            return next(new HttpException(400, `${location} is missing`));
        }

        const dtoInstance = plainToClass(type, data);

        validate(dtoInstance, { skipMissingProperties }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                Logger.error('Validation errors:', errors);

                const formattedErrors = errors.map((err) => {
                    const constraints = err.constraints ? Object.values(err.constraints)[0] : 'invalid';
                    return {
                        field: err.property,
                        message: constraints,
                    };
                });

                return res.status(400).json({
                    statusCode: 400,
                    message: "Đã xảy ra lỗi",
                    errors: formattedErrors,
                });
            } else {
                next();
            }
        }).catch((error: Error) => {
            Logger.error('Error Middleware:', error);
            return sendResponse(res, 500, 'server error');
        });
    };
};

export default errorMiddleware;
