// DTO để cập nhật mật khẩu
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UpdatePasswordDto {
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @Length(6, 255, { message: 'Mật khẩu phải từ 6 ký tự trở lên' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message:
            'Mật khẩu phải chứa ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt (@$!%*?&)',
    })
    old_password!: string;

    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @Length(6, 255, { message: 'Mật khẩu phải từ 6 ký tự trở lên' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message:
            'Mật khẩu phải chứa ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt (@$!%*?&)',
    })
    new_password!: string;
}