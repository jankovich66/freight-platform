import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, Max, Min, MinDate } from "class-validator";
import { LoadStatus, TransportType } from "../entities/load.entity";

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

    @IsNumber()
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

    @IsEnum(TransportType, { message: 'Transport type must be either FTL or LTL' })
    @IsNotEmpty({ message: 'Transport type cannot be empty' })
    readonly transportType: TransportType;

    @Type(() => Number)
    @IsNumber({}, { message: 'Required space must be a number' })
    @Min(0.1, { message: 'Required space must be at least 0.1 LDM' })
    @Max(13.6, { message: 'Required space cannot exceed 13.6 LDM' })
    @IsNotEmpty({ message: 'Required space cannot be empty' })
    readonly requiredSpaceLdm: number;
}
