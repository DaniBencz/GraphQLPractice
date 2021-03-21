'use strict';

import mysql from 'mysql2/promise';

let pool;
const getPool = () => {
    if (!pool) {
        pool = mysql.createPool({
            connectionLimit: 100,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            multipleStatements: true,
        });
        console.log('pool created');
    }
    return pool;
};
export default getPool();
