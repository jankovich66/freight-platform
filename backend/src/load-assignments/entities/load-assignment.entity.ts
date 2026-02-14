import { Load } from "src/loads/entities/load.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'load_assignment' })
export class LoadAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'assigned_at' })
    assignedAt: Date;

    @JoinColumn({ name: 'carrier_id' })
    @ManyToOne(() => User, carrier => carrier.loadAssignment, { onDelete: 'CASCADE' })
    carrier: User;

    @JoinColumn({ name: 'load_id' })
    @ManyToOne(() => Load, load => load.loadAssignment, { onDelete: 'CASCADE' })
    load: Load;
}