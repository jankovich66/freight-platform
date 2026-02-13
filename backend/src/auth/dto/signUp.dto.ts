import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { UserRole } from "src/users/entities/user.entity";

export class SingUpDto {
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({ message: '' })
    email: string;

    @IsNotEmpty({ message: '' })
    password: string;

    @IsNotEmpty({ message: '' })
    phoneNumber: string;

    @IsNotEmpty({ message: '' })
    @IsEnum(UserRole, { message: '' })
    role: UserRole;
}