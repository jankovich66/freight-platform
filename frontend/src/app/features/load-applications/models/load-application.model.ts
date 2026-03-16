import { Load } from "../../loads/models/load.model";
import { LoadApplicationStatus } from "../enums/load-application-status.enum";

export interface LoadApplication {
    id: number;
    offeredPrice: number;
    status: LoadApplicationStatus;
    createdAt: string;
    load: Load;
}