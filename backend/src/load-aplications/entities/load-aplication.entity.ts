import { Load } from "src/loads/entities/load.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum LoadAplicationStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
}

@Entity({ name: 'load_aplication' })
export class LoadAplication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'offered_price' })
    offeredPrice: number;

    @Column({
        type: 'enum',
        enum: LoadAplicationStatus,
        default: LoadAplicationStatus.PENDING
    })
    status: LoadAplicationStatus;

    @JoinColumn({ name: 'load_id' })
    @ManyToOne(() => Load, load => load.loadAplications, { onDelete: 'CASCADE' })
    load: Load;

    @JoinColumn({ name: 'carrier_id' })
    @ManyToOne(() => User, carrier => carrier.loadAplications, { onDelete: 'CASCADE' })
    carrier: User;
}
