import { Load } from "../../loads/models/load.model";

export interface LoadAssignment {
    id: number;
    assignedAt: string;
    load: Load;
}
