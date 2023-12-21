import { DataSource, DataSourceOptions } from "typeorm"
import config from './data-source'

const AppDataSource = new DataSource(config)

AppDataSource.initialize()
    .then(async () => {
        const checkDbExist = await AppDataSource.manager.query(`SELECT datname FROM pg_database WHERE datname = 'hiv' LIMIT 1`)
        
        if (!checkDbExist.length)
            await AppDataSource.manager.query(`CREATE DATABASE hiv`)
    })
    .catch((error) => console.log(error))