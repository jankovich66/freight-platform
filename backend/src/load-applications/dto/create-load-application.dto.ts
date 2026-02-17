import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateLoadApplicationDto {
    @IsNumber()
    @IsNotEmpty({ message: 'Offered price cannot be empty' })
    readonly offeredPrice: number;
}
