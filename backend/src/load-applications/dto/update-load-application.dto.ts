import { PartialType } from "@nestjs/mapped-types";
import { CreateLoadApplicationDto } from "./create-load-application.dto";
import { LoadApplicationStatus } from "../entities/load-application.entity";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateLoadApplicationDto extends PartialType(CreateLoadApplicationDto) {
    @IsNotEmpty()
    @IsEnum(LoadApplicationStatus)
    status: LoadApplicationStatus;
}