import {
    IsNotEmpty,
    IsString,
    Length,
    IsInt,
    Min,
    Max
} from 'class-validator';

export class CreateDto {
    @IsNotEmpty({ message: 'Tên vai trò không được để trống' })
    @IsString()
    @Length(2, 255, { message: 'Tên vai trò phải từ 2 đến 255 ký tự' })
    name!: string;

}
