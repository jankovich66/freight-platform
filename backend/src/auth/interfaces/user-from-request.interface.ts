import { UserRole } from "src/users/entities/user.entity";

export interface UserFromRequest {
    id: number;
    role: UserRole;
}
