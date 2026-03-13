import type { RecordId } from 'surrealdb';

type SerializeRecordId<T> = T extends RecordId<infer _, infer _>
  ? string
  : T extends object
  ? { [K in keyof T]: SerializeRecordId<T[K]> }
  : T;

export type Serialized<T> = SerializeRecordId<T>;
