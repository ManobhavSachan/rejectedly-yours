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

const mockData: Entry[] = [
];

export async function fetchEntries(): Promise<Entry[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockData;
}

export async function updateEntry(id: string, status: string): Promise<Entry> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const entry = mockData.find((entry) => entry.id === id);
  if (!entry) {
    throw new Error(`Entry with id ${id} not found`);
  }
  entry.status = status as Entry["status"];
  return entry;
}
