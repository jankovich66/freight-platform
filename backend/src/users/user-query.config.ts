import { QueryConfig } from "src/common/query/interfaces/query-config.interface";
import { User } from "./entities/user.entity";

export const USER_QUERY_CONFIG: QueryConfig<User> = {
    alias: 'user',

    sortableFields: {
        companyName: 'user.companyName',
        role: 'user.role'
    },

    filterableFields: {
        companyName: (qb, value) => { qb.andWhere('user.companyName ILIKE :name', { name: `%${value}%` }) },
        role: (qb, value) => { qb.andWhere('user.role = :role', { role: value }) }
    }
}