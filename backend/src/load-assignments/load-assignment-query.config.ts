import { QueryConfig } from "src/common/query/interfaces/query-config.interface";
import { LoadAssignment } from "./entities/load-assignment.entity";

export const LOAD_ASSIGNMENT_QUERY_CONFIG: QueryConfig<LoadAssignment> = {
    alias: 'loadAssignment',

    sortableFields: {
        assignedAt: 'loadAssignment.assignedAt'
    },

    filterableFields: {
        assignedFrom: (qb, value) => { qb.andWhere('loadAssignment.assignedAt >= :assignedFrom', { assignedFrom: value }) },

        assignedTo: (qb, value) => { qb.andWhere('loadAssignment.assignedAt <= :assignedTo', { assignedTo: value }) }
    }
}