import { RecordId } from "surrealdb";

export function recordIdFromString(rid: string): RecordId {
    const [table, id] = rid.split(':');
    return new RecordId(table, id);
}