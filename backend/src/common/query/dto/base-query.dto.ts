import { IsEnum, IsOptional, IsSemVer, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

export class BaseQueryDto extends PaginationDto {
    @IsOptional()
    @IsString()
    sort?: string;

    @IsOptional()
    @IsEnum(SortOrder)
    order?: SortOrder = SortOrder.ASC;
}
