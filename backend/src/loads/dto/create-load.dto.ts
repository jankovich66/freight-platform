import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, MinDate } from "class-validator";
import { LoadStatus } from "../entities/load.entity";

export class CreateLoadDto {
    @IsNotEmpty({ message: 'Title cannot be empty' })
    readonly title: string;

    @IsOptional()
    readonly description?: string;

    @IsNotEmpty({ message: 'Pickup address cannot be empty' })
    readonly pickupAddress: string;

    @IsNotEmpty({ message: 'Pickup city cannot be empty' })
    readonly pickupCity: string;

    @IsNotEmpty({ message: 'Delivery address cannot be empty' })
    readonly deliveryAddress: string;

    @IsNotEmpty({ message: 'Delivery city cannot be empty' })
    readonly deliveryCity: string;

    @IsNotEmpty({ message: 'Weight cannot be empty' })
    readonly weight: number;

    @IsNotEmpty({ message: 'Price cannot be empty' })
    readonly price: number;

    @IsDate()
    @Type(() => Date)
    @MinDate(() => new Date())
    readonly pickupDate: Date;

    @IsDate()
    @Type(() => Date)
    @MinDate(() => new Date())
    readonly deliveryDate: Date;

    @IsEnum(LoadStatus)
    @IsOptional()
    readonly status?: LoadStatus;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    readonly shipperId: number;
}