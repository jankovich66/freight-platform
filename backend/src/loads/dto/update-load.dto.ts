import { PartialType } from "@nestjs/mapped-types";
import { CreateLoadDto } from "./create-load.dto";
import { LoadStatus } from "../entities/load.entity";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateLoadDto extends PartialType(CreateLoadDto) {
    @IsNotEmpty()
    @IsEnum(LoadStatus)
    readonly status: LoadStatus;
}
