import { LoadApplication } from "src/load-applications/entities/load-application.entity";
import { LoadAssignment } from "src/load-assignments/entities/load-assignment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum LoadStatus {
    OPEN = 'OPEN',
    ACCEPTED = 'ACCEPTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED'
}

@Entity()
export class Load {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ name: 'pickup_address' })
    pickupAddress: string;

    @Column({ name: 'pickup_city' })
    pickupCity: string;

    @Column({ name: 'delivery_address' })
    deliveryAddress: string;

    @Column({ name: 'delivery_city' })
    deliveryCity: string;

    @Column()
    weight: number;

    @Column()
    price: number;

    @Column({ name: 'pickup_date' })
    pickupDate: Date;

    @Column({ name: 'delivery_date' })
    deliveryDate: Date;

    @Column({
        type: 'enum',
        enum: LoadStatus,
        default: LoadStatus.OPEN
    })
    status: LoadStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @JoinColumn({ name: 'shipper_id' })
    @ManyToOne(() => User, shipper => shipper.loads, { onDelete: 'CASCADE' })
    shipper: User;

    @OneToMany(() => LoadApplication, loadApplications => loadApplications.load)
    loadApplications: LoadApplication[];

    @OneToMany(() => LoadAssignment, loadAssignment => loadAssignment.load)
    loadAssignment: LoadAssignment[];
}
