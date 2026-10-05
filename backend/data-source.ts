import { LoadApplication } from "./src/load-applications/entities/load-application.entity";
import { LoadAssignment } from "./src/load-assignments/entities/load-assignment.entity";
import { Load } from "./src/loads/entities/load.entity";
import { User } from "./src/users/entities/user.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'freight_platform',
    entities: [User, Load, LoadApplication, LoadAssignment],
    migrations: ['./src/migrations/*.ts'],
    synchronize: false,
});