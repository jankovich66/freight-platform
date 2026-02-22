import { UserRole } from "../enums/user-role.enum";

export interface User {
    email: string;
    phoneNumber: string;
    companyName: string;
    role: UserRole;
}