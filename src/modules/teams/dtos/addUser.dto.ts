import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class AddUserDto {

    @IsNotEmpty({ message: 'Vui lòng chọn nhân sự ' })
    @IsString({ message: 'Vui lòng chọn nhân sự ' })
    email!: string;

}
