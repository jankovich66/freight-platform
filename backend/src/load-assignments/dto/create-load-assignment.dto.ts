import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateLoadAssignmentDto {
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    readonly carrierId: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    readonly loadId: number;
}
