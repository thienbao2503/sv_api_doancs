import {
    IsString,
    Length,
    IsInt,
    IsDateString,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    @Length(2, 255, { message: 'Tên dự án phải từ 2 đến 255 ký tự' })
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Ngày bắt đầu không hợp lệ' })
    start_date?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Ngày kết thúc không hợp lệ' })
    end_date?: string;

    @IsOptional()
    @IsString()
    goal?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Ngân sách phải là số' })
    budget?: number;

    @IsOptional()
    @IsString()
    @Length(2, 3, { message: 'Mã tiền tệ phải từ 2 đến 3 ký tự' })
    currency?: string;

    @IsOptional()
    @IsInt({ message: 'Thời gian dự kiến phải là số nguyên' })
    duration?: number;
}
