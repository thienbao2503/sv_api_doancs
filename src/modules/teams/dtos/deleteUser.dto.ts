import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class DeleteUserDto {

    @IsNotEmpty({ message: 'Vui lòng chọn nhân sự ' })
    user_id!: number;

}
