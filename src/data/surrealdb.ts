import { Surreal } from 'surrealdb';

type SuccessSession = {
    db: Surreal,
    isSuccess: true,
    error?: Error,
}

type ErrorSession = {
    db?: Surreal,
    isSuccess: false,
    error: Error,
}

export async function connect(token?: string): Promise<SuccessSession | ErrorSession> {
  try {
    const db = new Surreal();
    await db.connect(process.env.SURREAL_HOST, {
      namespace: process.env.SURREAL_NS,
      database: process.env.SURREAL_DB,
    });

    if (token) db.authenticate(token);

    return { isSuccess: true, db };
  } catch (e) {
    console.error('Error connecting to SurrealDB:', e);
    return { isSuccess: false, error: e as Error };
  }
}

export async function execute<T>(cb: (db: Surreal) => Promise<T>, token?: string): Promise<T> {
    const db = new Surreal();
    await db.connect(process.env.SURREAL_HOST, {
      namespace: process.env.SURREAL_NS,
      database: process.env.SURREAL_DB,
    });

    if (token) db.authenticate(token);

    const res = await cb(db);

    db.close();

    return res;
}