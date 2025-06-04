import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class UpdateRoleDto {
    @IsNotEmpty({ message: 'Vui lòng chọn quyền ' })
    @IsString({ message: 'Vui lòng chọn quyền ' })
    role_id!: string;
}
