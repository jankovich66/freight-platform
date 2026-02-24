export interface CreateLoad {
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
}
