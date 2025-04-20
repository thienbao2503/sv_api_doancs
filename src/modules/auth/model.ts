export interface IModal {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    password: string;
    active: string;
    created_at: Date;
    updated_at: Date;
    avatar_url?: string;         // ảnh đại diện, có thể không có
    address?: string;            // địa chỉ, có thể không có
    birthday?: Date;             // ngày sinh, có thể không có
    gender?: 'MALE' | 'FEMALE' | 'OTHER'; // giới tính, có thể không có
    id_number?: string;          // số CMND/CCCD, có thể không có
    experience_years?: number;   // số năm kinh nghiệm, có thể không có
}
