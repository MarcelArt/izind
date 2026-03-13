import { Surreal } from 'surrealdb';

const db = new Surreal();
let isConnected = false;

async function connect() {
    try {
        await db.connect(process.env.SURREAL_HOST, {
            namespace: process.env.SURREAL_NS,
            database: process.env.SURREAL_DB,
        });
        isConnected = true;
        console.log('Connected to SurrealDB');
    }
    catch(e) {
        console.error('Error connecting to SurrealDB:', e)
    }
}

export async function getDb(): Promise<Surreal> {
    if (!isConnected) await connect();

    return db;
}