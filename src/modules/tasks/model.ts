export interface IModal {
    project_id: number;
    name: string;
    description?: string;
    deadline?: Date;
    priority?: number;
    status?: number;
    start_time?: Date;
    end_time?: Date;
    created_at?: Date;
    updated_at?: Date;
    publish?: number;
}