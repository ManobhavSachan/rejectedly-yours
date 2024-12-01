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
  {
    id: "a1b2c3d4",
    message_id: "msg-001",
    sender_email: "john.doe@example.com",
    position: "Software Engineer",
    company: "TechCorp",
    status: "Applied",
    summary: "Applied for Software Engineer position",
    suggested_action: "Follow up",
    updated_at: "2023-05-01",
    created_at: "2023-05-01",
  },
  {
    id: "e5f6g7h8",
    message_id: "msg-002",
    sender_email: "jane.smith@example.com",
    position: "Product Manager",
    company: "InnovateCo",
    status: "Rejected",
    summary: "Rejected for Product Manager position",
    suggested_action: "Follow up",
    updated_at: "2023-05-05",
    created_at: "2023-05-05",
  },
  {
    id: "i9j0k1l2",
    message_id: "msg-003",
    sender_email: "alice.jones@example.com",
    position: "Data Scientist",
    company: "DataDriven",
    status: "Interview",
    summary: "Interview scheduled for Data Scientist position",
    suggested_action: "Follow up",
    updated_at: "2023-05-10",
    created_at: "2023-05-10",
  },
  {
    id: "m3n4o5p6",
    message_id: "msg-004",
    sender_email: "bob.brown@example.com",
    position: "UX Designer",
    company: "DesignHub",
    status: "Job Offer",
    summary: "Job offer received for UX Designer position",
    suggested_action: "Follow up",
    updated_at: "2023-05-15",
    created_at: "2023-05-15",
  },
  {
    id: "q7r8s9t0",
    message_id: "msg-005",
    sender_email: "carol.white@example.com",
    position: "Frontend Developer",
    company: "WebWizards",
    status: "In Progress",
    summary: "In progress for Frontend Developer position",
    suggested_action: "Follow up",
    updated_at: "2023-05-20",
    created_at: "2023-05-20",
  },
  {
    id: "u1v2w3x4",
    message_id: "msg-006",
    sender_email: "dave.green@example.com",
    position: "DevOps Engineer",
    company: "CloudNine",
    status: "Accepted",
    summary: "Accepted for DevOps Engineer position",
    suggested_action: "Follow up",
    updated_at: "2023-05-25",
    created_at: "2023-05-25",
  },
  {
    id: "y5z6a7b8",
    message_id: "msg-007",
    sender_email: "eve.black@example.com",
    position: "Marketing Specialist",
    company: "BrandBoost",
    status: "No Reply",
    summary: "No reply received for Marketing Specialist position",
    suggested_action: "Follow up",
    updated_at: "2023-05-30",
    created_at: "2023-05-30",
  },
  {
    id: "z9y8x7w6",
    message_id: "19380e989fb26c1f",
    sender_email: "no-reply@us.greenhouse-mail.io",
    position: "Associate Software Engineer (C/C++)",
    company: "Precisely",
    status: "Rejected",
    summary: "The candidate was not selected to proceed to the next stage of the hiring process. Although the resume was impressive, another candidate was better suited for this particular role.",
    suggested_action: "Apply to other roles :)",
    updated_at: "2024-12-01",
    created_at: "2024-12-01",
  },
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
