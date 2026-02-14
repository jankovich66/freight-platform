import { LoadAplication } from "src/load-aplications/entities/load-aplication.entity";
import { LoadAssignment } from "src/load-assignments/entities/load-assignment.entity";
import { Load } from "src/loads/entities/load.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = 'ADMIN',
    CARRIER = 'CARRIER',
    SHIPPER = 'SHIPPER'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ name: 'phone_number' })
    phoneNumber: string;

    @Column({ name: 'company_name' })
    companyName: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.SHIPPER
    })
    role: UserRole;

    @OneToMany(() => Load, loads => loads.shipper)
    loads: Load[];

    @OneToMany(() => LoadAplication, loadAplications => loadAplications.carrier)
    loadAplications: LoadAplication[];

    @OneToMany(() => LoadAssignment, loadAssignment => loadAssignment.carrier)
    loadAssignment: LoadAssignment[];
}
