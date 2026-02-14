import { Load } from "src/loads/entities/load.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'load_assignment' })
export class LoadAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'assigned_at' })
    assignedAt: Date;

    @ManyToOne(() => User, carrier => carrier.loadAssignment)
    carrier: User;

    @ManyToOne(() => Load, load => load.loadAssignment)
    load: Load;
}