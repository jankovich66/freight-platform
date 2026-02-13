import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({ message: 'Email cannot be empty' })
    readonly email: string;

    @IsNotEmpty({ message: 'Password cannot be empty' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    readonly password: string;
}