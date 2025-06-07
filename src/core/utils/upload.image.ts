import { HttpException } from "@core/exceptions";
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Không cần import kiểu File riêng — dùng Express.Multer.File là đúng
export namespace UploadImage {
    const allowedFileTypes = ['.png', '.jpg', '.jpeg'];

    export const createFolderIfNotExist = (dir: string) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    export const uploadOrUpdateImage = async (
        code: string,
        file: any,
        UPLOAD_IMAGE_PATH: string
    ) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (!allowedFileTypes.includes(ext)) {
            throw new HttpException(400, 'invalid file type');
        }

        const userDir = path.join(__dirname, UPLOAD_IMAGE_PATH, code);
        createFolderIfNotExist(userDir);

        // Xoá ảnh cũ
        const existingFiles = fs.readdirSync(userDir);
        for (const fileName of existingFiles) {
            fs.unlinkSync(path.join(userDir, fileName));
        }

        const fileName = `${code}${ext}`;
        const uploadPath = path.join(userDir, fileName);
        await sharp(file.buffer).toFile(uploadPath);

        const relativePath = path.relative(
            path.join(__dirname, UPLOAD_IMAGE_PATH, '..'),
            uploadPath
        );

        return relativePath.replace(/\\/g, '/');
    }

    export const uploadMultipleImages = async (
        prefix: string,
        files: any[],
        UPLOAD_IMAGE_PATH: string
    ) => {
        const uploadedPaths: string[] = [];

        for (const file of files) {
            const ext = path.extname(file.originalname).toLowerCase();
            if (!allowedFileTypes.includes(ext)) {
                continue; // Skip invalid files
            }

            try {
                const uniqueCode = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(7)}`;
                const userDir = path.join(__dirname, UPLOAD_IMAGE_PATH, prefix);
                createFolderIfNotExist(userDir);

                const fileName = `${uniqueCode}${ext}`;
                const uploadPath = path.join(userDir, fileName);

                await sharp(file.buffer)
                    .resize(800) // Optional: resize images to a maximum width
                    .toFile(uploadPath);

                const relativePath = path.relative(
                    path.join(__dirname, UPLOAD_IMAGE_PATH, '..'),
                    uploadPath
                );

                uploadedPaths.push(relativePath.replace(/\\/g, '/'));
            } catch (error) {
                console.error('Error uploading file:', error);
                continue;
            }
        }

        return uploadedPaths;
    }
}
