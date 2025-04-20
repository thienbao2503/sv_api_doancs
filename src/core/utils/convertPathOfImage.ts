import path from "path";

export const convertPathOfImage = (image: string, code: string, type?: string) => {
    let userDir = ''
    if (type === 'thumbnail') {
        userDir = path.join('uploads', process.env.PRODUCT_UPLOAD_IMAGE as string, code, 'thumbnail');
    }
    else {
        userDir = path.join('uploads', process.env.PRODUCT_UPLOAD_IMAGE as string, code);
    }
    const rePath = path.join(userDir, image)
    return rePath
}