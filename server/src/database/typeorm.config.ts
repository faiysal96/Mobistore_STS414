import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';


const dbType:any = process.env.RDS_TYPE;

const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbType,
    host: process.env.RDS_HOSTNAME,
    port: parseInt(process.env.RDS_PORT),
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    entities: [join(__dirname, '..', '..', 'modules', '**', '*.entity.{js,ts}')],
    // seeds: ['src/seeds/**/*{.ts,.js}'],
    // factories: ['src/factories/**/*{.ts,.js}'],
    synchronize: Boolean(process.env.TYPEORM_SYNC == 'true'),
    migrationsRun: false,
    migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
    cli: {
        migrationsDir: join('src', 'database', 'migrations')
    }
};

export default typeOrmConfig;