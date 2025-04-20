import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    Matches,
} from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @Length(2, 255)
    full_name!: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Email không hợp lệ' })
    email!: string;

    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @Matches(/^((\+84|0)[3|5|7|8|9])+([0-9]{8})$/, {
        message: 'Số điện thoại không hợp lệ',
    })
    phone!: string;

    @IsNotEmpty()
    @Length(6, 255, { message: 'Mật khẩu phải từ 6 ký tự trở lên' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message:
            'Mật khẩu phải chứa ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt (@$!%*?&)',
    })
    password!: string;

}
