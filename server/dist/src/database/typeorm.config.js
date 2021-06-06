"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const dbType = process.env.RDS_TYPE;
const typeOrmConfig = {
    type: dbType,
    host: process.env.RDS_HOSTNAME,
    port: parseInt(process.env.RDS_PORT),
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    entities: [path_1.join(__dirname, '..', '..', 'modules', '**', '*.entity.{js,ts}')],
    synchronize: Boolean(process.env.TYPEORM_SYNC == 'true'),
    migrationsRun: false,
    migrations: [path_1.join(__dirname, '..', 'migrations', '*.{ts,js}')],
    cli: {
        migrationsDir: path_1.join('src', 'database', 'migrations')
    }
};
exports.default = typeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map