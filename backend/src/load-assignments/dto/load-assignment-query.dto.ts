import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { BaseQueryDto } from "src/common/query/dto/base-query.dto";

export class LoadAssignmentQueryDto extends BaseQueryDto {
    @IsOptional()
    @Type(() => Date)
    assignedFrom?: Date;

    @IsOptional()
    @Type(() => Date)
    assignedTo?: Date;
}
