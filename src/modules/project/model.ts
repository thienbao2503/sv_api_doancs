export interface IModal {
    id?: number;
    name: string;
    description: string;
    user_id: number;
    start_date: string; // ISO format: yyyy-mm-dd
    end_date: string;   // ISO format: yyyy-mm-dd
    status: string;     // hoặc nếu bạn dùng id trạng thái thì có thể là: status_id: number;
    goal: string;
    budget: number;
    currency: string;   // ví dụ: 'VND', 'USD'
    duration: number;   // thời gian dự kiến tính theo ngày
    created_at?: Date;
    updated_at?: Date;
}
