import { IsEmail, IsOptional, MinLength } from "class-validator";

export class UpdateProfileDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsOptional()
    @MinLength(8)
    password?: string;

    @IsOptional()
    phoneNumber?: string;

    @IsOptional()
    companyName?: string;
}
