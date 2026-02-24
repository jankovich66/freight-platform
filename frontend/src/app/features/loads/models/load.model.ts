import { LoadStatus } from "../enums/load-status.enum";

export interface Load {
    id: number,
    title: string;
    description: string;
    pickupAddress: string;
    pickupCity: string;
    deliveryAddress: string;
    deliveryCity: string;
    weight: number;
    price: number;
    pickupDate: Date;
    deliveryDate: Date;
    status: LoadStatus;
}
