"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    type: 'mysql',
    host: process.env.RDS_HOSTNAME || 'localhost',
    port: parseInt(process.env.RDS_PORT) || 3306,
    username: process.env.RDS_USERNAME || 'root',
    password: process.env.RDS_PASSWORD || '!Montreal',
    database: process.env.RDS_DB_NAME || 'kart',
    entities: ['src/modules/**/*.entity.{js}'],
    synchronize: false,
    trace: true,
    autoLoadEntities: true,
    logging: true,
    migrationsRun: false,
    migrations: ['src/database/migrations/*.{js}'],
    cli: {
        entitiesDir: "src/modules",
        migrationsDir: 'src/database/migrations'
    }
};
//# sourceMappingURL=ormconfig.js.map