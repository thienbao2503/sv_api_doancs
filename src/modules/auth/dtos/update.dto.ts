import {
    IsEmail,
    IsNotEmpty,
    Length,
    Matches,
    IsString
} from 'class-validator';

export class UpdateDto {
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @Matches(/^(0|\+84)[0-9]{9,10}$/, { message: 'Số điện thoại không hợp lệ' })
    phone!: string;

    @IsNotEmpty({ message: 'Họ tên không được để trống' })
    @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
    @Length(2, 255, { message: 'Họ tên phải từ 2 đến 255 ký tự' })
    full_name!: string;
}