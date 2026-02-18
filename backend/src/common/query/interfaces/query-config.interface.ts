import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

export interface QueryConfig<T extends ObjectLiteral> {
    alias: string;

    sortableFields?: Record<string, string>;

    filterableFields?: Record<string, (qb: SelectQueryBuilder<T>, value: any) => void>;

    defaultSort?: {
        field: string;
        order: 'ASC' | 'DESC';
    };
}