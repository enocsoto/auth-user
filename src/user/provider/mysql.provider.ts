import { Injectable } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';

@Injectable()
export class MysqlProvider {
    private static instance: Pool;

    static async getInstance(): Promise<Pool> {
        if (!MysqlProvider.instance) {
            MysqlProvider.instance = await createPool({
                host: 'localhost',
                user: 'enoc',
                password: '1234',
                database: 'sesions',
                port:3310
            });
        };
        return MysqlProvider.instance;
    };
}
