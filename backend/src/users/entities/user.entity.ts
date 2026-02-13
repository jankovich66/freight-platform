import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = 'admin',
    CARRIER = 'carrier',
    SHIPPER = 'shipper'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.SHIPPER
    })
    role: UserRole;
}
