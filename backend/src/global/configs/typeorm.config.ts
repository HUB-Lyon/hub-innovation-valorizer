import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import config from '../../../database/data-source'



const dbConfig = {
    ...config,
    database: 'hiv',
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    //    autoLoadEntities: true,
    //    synchronize: false,
}

export default registerAs('typeorm', () => dbConfig)
export const connectionSource = new DataSource(dbConfig as DataSourceOptions);
