export interface Entry {
  id: string;
  title: string;
  company: string;
  status: 'Applied' | 'In Progress' | 'Interview' | 'Rejected' | 'Job Offer' | 'Accepted' | 'No Reply';
  date: string;
}

const mockData: Entry[] = [
  { id: '1', title: 'Software Engineer', company: 'TechCorp', status: 'Applied', date: '2023-05-01' },
  { id: '2', title: 'Product Manager', company: 'InnovateCo', status: 'Rejected', date: '2023-05-05' },
  { id: '3', title: 'Data Scientist', company: 'DataDriven', status: 'Interview', date: '2023-05-10' },
  { id: '4', title: 'UX Designer', company: 'DesignHub', status: 'Job Offer', date: '2023-05-15' },
  { id: '5', title: 'Frontend Developer', company: 'WebWizards', status: 'In Progress', date: '2023-05-20' },
  { id: '6', title: 'DevOps Engineer', company: 'CloudNine', status: 'Accepted', date: '2023-05-25' },
  { id: '7', title: 'Marketing Specialist', company: 'BrandBoost', status: 'No Reply', date: '2023-05-30' },
];

export async function fetchEntries(): Promise<Entry[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockData;
}

