import {
    IsNotEmpty,
    IsString,
    Length,
    IsInt,
    IsOptional,
    IsDateString
} from 'class-validator';

export class CreateDto {
    @IsNotEmpty({ message: 'ID dự án không được để trống' })
    @IsInt({ message: 'ID dự án phải là số nguyên' })
    project_id!: number;

    @IsNotEmpty({ message: 'Tên công việc không được để trống' })
    @IsString()
    @Length(2, 255, { message: 'Tên công việc phải từ 2 đến 255 ký tự' })
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;


    @IsOptional()
    @IsString()
    @Length(0, 10, { message: 'Độ ưu tiên tối đa 10 ký tự' })
    priority?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Thời gian bắt đầu phải là ngày hợp lệ' })
    start_time?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Thời gian kết thúc phải là ngày hợp lệ' })
    end_time?: string;

    @IsOptional()
    userIDs?: number[];



}

