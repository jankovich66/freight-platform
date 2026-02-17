import { Load } from "src/loads/entities/load.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum LoadApplicationStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
}

@Entity({ name: 'load_application' })
export class LoadApplication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'offered_price' })
    offeredPrice: number;

    @Column({
        type: 'enum',
        enum: LoadApplicationStatus,
        default: LoadApplicationStatus.PENDING
    })
    status: LoadApplicationStatus;

    @JoinColumn({ name: 'load_id' })
    @ManyToOne(() => Load, load => load.loadApplications, { onDelete: 'CASCADE' })
    load: Load;

    @JoinColumn({ name: 'carrier_id' })
    @ManyToOne(() => User, carrier => carrier.loadApplications, { onDelete: 'CASCADE' })
    carrier: User;
}
