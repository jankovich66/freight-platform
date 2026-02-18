import { QueryConfig } from "src/common/query/interfaces/query-config.interface";
import { Load } from "./entities/load.entity";

export const LOAD_QUERY_CONFIG: QueryConfig<Load> = {
    alias: 'load',

    sortableFields: {
        price: 'load.price',
        pickupDate: 'load.pickupDate',
        weight: 'load.weight'
    },

    filterableFields: {
        title: (qb, value) => qb.andWhere('load.title ILIKE :title', { title: `%${ value }%` }),

        status: (qb, value) => qb.andWhere('load.status = :status', { status: value }),

        pickupCity: (qb, value) => qb.andWhere('load.pickupCity ILIKE :pickupCity', { pickupCity: `%${ value }%` }),

        deliveryCity: (qb, value) => qb.andWhere('load.deliveryCity ILIKE :deliveryCity', { deliveryCity: `%${ value }%` }),

        pickupDateFrom: (qb, value) => qb.andWhere('load.pickupDate >= :pickupDateFrom', { pickupDateFrom: value }),

        pickupDateTo: (qb, value) => qb.andWhere('load.pickupDate <= :pickupDateTo', { pickupDateTo: value }),

        minWeight: (qb, value) => qb.andWhere('load.weight >= :minWeight', { minWeight: value }),

        maxWeight: (qb, value) => qb.andWhere('load.weight <= :maxWeight', { maxWeight: value }),

        minPrice: (qb, value) => qb.andWhere('load.price >= :minPrice', { minPrice: value }),

        maxPrice: (qb, value) => qb.andWhere('load.price <= :maxPrice', { maxPrice: value })
    },

    defaultSort: {
        field: 'load.pickupDate',
        order: 'DESC'
    }
};
