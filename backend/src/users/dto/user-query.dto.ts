import { IsOptional } from "class-validator";
import { BaseQueryDto } from "src/common/query/dto/base-query.dto";
import { UserRole } from "../entities/user.entity";

export class UserQueryDto extends BaseQueryDto {
    @IsOptional()
    companyName?: string;

    @IsOptional()
    role!: UserRole;
}
