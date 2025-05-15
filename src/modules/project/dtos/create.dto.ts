import {
    IsNotEmpty,
    IsString,
    Length,
    IsInt,
    IsDateString,
    IsNumber
} from 'class-validator';

export class CreateProjectDto {
    @IsNotEmpty({ message: 'Tên dự án không được để trống' })
    @IsString()
    @Length(2, 255, { message: 'Tên dự án phải từ 2 đến 255 ký tự' })
    name!: string;

    @IsNotEmpty({ message: 'Mô tả không được để trống' })
    @IsString()
    description!: string;

    @IsNotEmpty({ message: 'Ngày bắt đầu không được để trống' })
    @IsDateString({}, { message: 'Ngày bắt đầu không hợp lệ' })
    start_date!: string;

    @IsNotEmpty({ message: 'Ngày kết thúc không được để trống' })
    @IsDateString({}, { message: 'Ngày kết thúc không hợp lệ' })
    end_date!: string;

    @IsNotEmpty({ message: 'Mục tiêu không được để trống' })
    @IsString()
    goal!: string;

    @IsNotEmpty({ message: 'Ngân sách không được để trống' })
    @IsNumber({}, { message: 'Ngân sách phải là số' })
    budget!: number;

    @IsNotEmpty({ message: 'Mã tiền tệ không được để trống' })
    @IsString()
    @Length(2, 3, { message: 'Mã tiền tệ phải từ 2 đến 3 ký tự' })
    currency!: string;

    @IsNotEmpty({ message: 'Thời gian dự kiến không được để trống' })
    duration!: number;
}
