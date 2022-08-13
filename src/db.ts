import { Pool } from 'pg';

const connectionString = process.env.DB_CONNECTION;
const db = new Pool({ connectionString });

export { db };
