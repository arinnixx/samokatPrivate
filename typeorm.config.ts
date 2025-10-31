import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

ConfigModule.forRoot({
    envFilePath: ['.env'],
});

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST,
    port: +process.env.PG_PORT,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    entities: ['*/entities/*.ts'],
    migrations: ['src/migrations/*.ts'],
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.log('Error during Data Source initialization!', err);
    });

export default AppDataSource;
