import { Load } from "src/loads/entities/load.entity";
import { User } from "src/users/entities/user.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'load_assignment' })
export class LoadAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'assigned_at' })
    assignedAt: Date;

    @JoinColumn({ name: 'carrier_id' })
    @ManyToOne(() => User, carrier => carrier.loadAssignments, { onDelete: 'CASCADE' })
    carrier: User;

    @JoinColumn({ name: 'load_id' })
    @OneToOne(() => Load, load => load.loadAssignment, { onDelete: 'CASCADE' })
    load: Load;
}
