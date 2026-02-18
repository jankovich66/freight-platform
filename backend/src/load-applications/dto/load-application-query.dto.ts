import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { BaseQueryDto } from "src/common/query/dto/base-query.dto";
import { LoadApplicationStatus } from "../entities/load-application.entity";

export class LoadApplicationQueryDto extends BaseQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minOfferedPrice?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    maxOfferedPrice?: number;

    @IsOptional()
    @IsEnum(LoadApplicationStatus)
    status?: LoadApplicationStatus;
}
