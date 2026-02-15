import { PartialType } from "@nestjs/mapped-types";
import { CreateLoadAplicationDto } from "./create-load-aplication.dto";
import { LoadAplicationStatus } from "../entities/load-aplication.entity";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateLoadAplicationDto extends PartialType(CreateLoadAplicationDto) {
    @IsNotEmpty()
    @IsEnum(LoadAplicationStatus)
    status: LoadAplicationStatus;
}