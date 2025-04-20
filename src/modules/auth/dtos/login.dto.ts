import {
    IsEmail,
    IsNotEmpty,
    Length,
    Matches,
} from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'Email không được để trống' })
    @IsEmail({}, { message: 'Email không hợp lệ' })
    email!: string;

    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @Length(6, 255, { message: 'Mật khẩu phải từ 6 ký tự trở lên' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message:
            'Mật khẩu phải chứa ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt (@$!%*?&)',
    })
    password!: string;
}