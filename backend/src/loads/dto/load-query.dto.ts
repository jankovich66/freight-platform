import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseQueryDto } from "src/common/query/dto/base-query.dto";
import { LoadStatus } from "../entities/load.entity";
import { Type } from "class-transformer";

export class LoadQueryDto extends BaseQueryDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsEnum(LoadStatus)
    status?: LoadStatus;

    @IsOptional()
    @IsString()
    pickupCity?: string;

    @IsOptional()
    @IsString()
    deliveryCity?: string;

    @IsOptional()
    @Type(() => Date)
    pickupDateFrom?: Date;

    @IsOptional()
    @Type(() => Date)
    pickupDateTo?: Date;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minWeight?: number;
    
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    maxWeight?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minPrice?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    maxPrice?: number;
}
