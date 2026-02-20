export enum UserRole {
    SHIPPER = 'SHIPPER',
    CARRIER = 'CARRIER'
}

export interface RegisterRequest {
    email: string;
    password: string;
    phoneNumber: string;
    companyName: string;
    role: UserRole;
}
