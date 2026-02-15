import { IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateLoadAplicationDto {
    @IsNumber()
    @IsNotEmpty({ message: 'Offered price cannot be empty' })
    readonly offeredPrice: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    readonly loadId: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    readonly carrierId: number;
}