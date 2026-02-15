import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsPositive, MinDate } from "class-validator";

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

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    readonly shipperId: number;
}