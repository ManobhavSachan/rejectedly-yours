import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || "");

export interface Entry {
  id: string;
  message_id: string;
  sender_email: string;
  position: string;
  company: string;
  status: string;
  summary: string;
  suggested_action: string;
  updated_at: string;
  created_at: string;
}

export async function fetchEntries(): Promise<Entry[]> {
  const entries = await sql`SELECT * FROM emails`;
  return entries as Entry[];
}

export async function updateEntry(id: string, status: string): Promise<Entry> {
  const [entry] = await sql`
    UPDATE emails
    SET status = ${status}
    WHERE id = ${id}
    RETURNING *;
  `;
  if (!entry) {
    throw new Error(`Entry with id ${id} not found`);
  }
  return entry as Entry;
}
