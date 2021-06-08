import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.RDS_HOSTNAME || 'localhost',
    port: parseInt(process.env.RDS_PORT) || 3306,
    username: process.env.RDS_USERNAME || 'root',
    password: process.env.RDS_PASSWORD || '',
    database: process.env.RDS_DB_NAME || 'kart',
    entities: [process.env.SQL_MODE == 'sql' ? 'src/modules/**/*.entity.{ts,js}': 'src/modules/**/*.entity.{js}'],
    synchronize: false,
    trace: true,
    autoLoadEntities: true,
    logging: true,
    migrationsRun: false,
    migrations: [process.env.SQL_MODE == 'sql' ? 'src/database/migrations/*.{js}' : 'src/database/migrations/*.{js}'],
    cli: {
        entitiesDir : "src/modules",
        migrationsDir: 'src/database/migrations'
    }
}