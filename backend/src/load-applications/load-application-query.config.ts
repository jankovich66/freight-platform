import { QueryConfig } from "src/common/query/interfaces/query-config.interface";
import { LoadApplication } from "./entities/load-application.entity";

export const LOAD_APPLICATION_QUERY_CONFIG: QueryConfig<LoadApplication> = {
    alias: 'loadApplication',

    sortableFields: {
        offeredPrice: 'loadApplication.offeredPrice'
    },

    filterableFields: {
        minOfferedPrice: (qb, value) => qb.andWhere('loadApplication.offeredPrice >= :minOfferedPrice', { minOfferedPrice: value }),
    
        maxOfferedPrice: (qb, value) => qb.andWhere('loadApplication.offeredPrice <= :maxOfferedPrice', { maxOfferedPrice: value }),

        status: (qb, value) => qb.andWhere('loadApplication.status = :status', { status: value }),
    }
};
