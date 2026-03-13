import { RecordId } from 'surrealdb';
import type { Serialized } from '@/@types/serialized';

function isRecordId(value: unknown): value is RecordId<string, string> {
  // Check for SurrealDB RecordId instance
  if (typeof RecordId !== 'undefined' && value instanceof RecordId) {
    return true;
  }

  // Fallback: check for RecordId-like structure (has tb and id, or rid property)
  return typeof value === 'object' &&
    value !== null &&
    (('tb' in value && 'id' in value) || 'rid' in value);
}

export function serializeForApi<T>(data: T): Serialized<T> {
  if (data === null || data === undefined) return data as Serialized<T>;

  // Handle RecordId - convert to string
  if (isRecordId(data)) {
    // Try toString() first
    if (typeof (data as RecordId<string, string>).toString === 'function') {
      return (data as RecordId<string, string>).toString() as Serialized<T>;
    }
    // Fallback: construct string from tb and id or rid
    const rid = (data as Record<string, unknown>);
    if ('tb' in rid && 'id' in rid) {
      return `${rid.tb}:${rid.id}` as Serialized<T>;
    }
    if ('rid' in rid) {
      return String(rid.rid) as Serialized<T>;
    }
  }

  // Handle arrays - recursively serialize
  if (Array.isArray(data)) {
    return data.map(serializeForApi) as Serialized<T>;
  }

  // Handle objects - recursively serialize
  if (typeof data === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      result[key] = serializeForApi(value);
    }
    return result as Serialized<T>;
  }

  return data as Serialized<T>;
}
