import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.RDS_HOSTNAME || 'localhost',
    port: parseInt(process.env.RDS_PORT) || 3306,
    username: process.env.RDS_USERNAME || 'root',
    password: process.env.RDS_PASSWORD || '!Montreal',
    database: process.env.RDS_DB_NAME || 'kart',
    // database: '../db.sqlite3',
    entities: ['src/modules/**/*.entity.{js}'],
    synchronize: false,
    trace: true,
    autoLoadEntities: true,
    logging: true,
    migrationsRun: false,
    migrations: ['src/database/migrations/*.{js}'],
    cli: {
        entitiesDir : "src/modules",
        migrationsDir: 'src/database/migrations'
    }
}