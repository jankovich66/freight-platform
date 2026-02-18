import { Injectable } from "@nestjs/common";
import { ObjectLiteral, Repository } from "typeorm";
import { BaseQueryDto } from "./dto/base-query.dto";
import { QueryConfig } from "./interfaces/query-config.interface";
import { SelectQueryBuilder } from "typeorm/browser";

@Injectable()
export class QueryService {
    async findWithQuery<T extends ObjectLiteral>(repository: Repository<T>, queryDto: BaseQueryDto, config: QueryConfig<T>, baseQuery?: (qb: SelectQueryBuilder<T>) => void) {
        const {
            page = 1,
            limit = 10,
            sort,
            order = 'ASC',
            ...filters
        } = queryDto;

        const qb = repository.createQueryBuilder(config.alias);

        if(baseQuery) {
            baseQuery(qb);
        }

        if(config.filterableFields) {
            for(const key of Object.keys(filters)) {
                const handler = config.filterableFields[key];
                const value = filters[key];

                if(handler && value !== undefined) {
                    handler(qb, value);
                }
            }
        }

        if(sort && config.sortableFields && config.sortableFields[sort]) {
            qb.orderBy(config.sortableFields[sort], order);
        }
        else if(config.defaultSort) {
            qb.orderBy(config.defaultSort.field, config.defaultSort.order);
        }

        qb.skip((page - 1) * limit).take(limit);

        const [data, total] = await qb.getManyAndCount();

        return {
            data,
            total,
            page,
            limit,
            lastPage: Math.ceil(total / limit)
        };
    }
}