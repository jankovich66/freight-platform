import { LoadApplication } from "src/load-applications/entities/load-application.entity";
import { LoadAssignment } from "src/load-assignments/entities/load-assignment.entity";
import { Load } from "src/loads/entities/load.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ name: 'company_name', nullable: true })
    companyName: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.SHIPPER
    })
    role: UserRole;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => Load, loads => loads.shipper)
    loads: Load[];

    @OneToMany(() => LoadApplication, loadApplications => loadApplications.carrier)
    loadApplications: LoadApplication[];

    @OneToMany(() => LoadAssignment, loadAssignments => loadAssignments.carrier)
    loadAssignments: LoadAssignment[];
}
