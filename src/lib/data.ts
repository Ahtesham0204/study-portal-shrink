export interface Branch {
  code: string;
  name: string;
  short: string;
  icon: string;
}

export interface Paper {
  id: string;
  branch: string;
  sem: number;
  subject: string;
  code: string;
  year: string;
  scheme: string;
  paperType: string;
  season: string;
  pdfUrl: string;
  dlUrl?: string;
}

export const BRANCHES: Branch[] = [
  { code: 'AU', name: 'Automobile Engineering', short: 'Auto', icon: '🚘' },
  { code: 'CE', name: 'Civil Engineering', short: 'Civil', icon: '🏛️' },
  { code: 'CH', name: 'Chemical Engineering', short: 'Chemical', icon: '🧪' },
  { code: 'CO', name: 'Computer Engineering', short: 'Computer', icon: '🖥️' },
  { code: 'EE', name: 'Electrical Engineering', short: 'Electrical', icon: '🔌' },
  { code: 'ET', name: 'Electronics & Telecommunication', short: 'E&TC', icon: '📡' },
  { code: 'ME', name: 'Mechanical Engineering', short: 'Mechanical', icon: '🔧' },
];

export const MANUAL_BRANCHES = [
  { code: 'CO', name: 'Computer Engineering', icon: '🖥️' },
  { code: 'CE', name: 'Civil Engineering', icon: '🏛️' },
  { code: 'ME', name: 'Mechanical Engineering', icon: '🔧' },
  { code: 'EJ', name: 'Electronics Engineering', icon: '📡' },
  { code: 'EE', name: 'Electrical Engineering', icon: '🔌' },
  { code: 'AI', name: 'Artificial Intelligence', icon: '🤖' },
];

export const SYLLABUS_BRANCHES = [
  { code: 'CO', name: 'Computer Engineering', icon: '🖥️' },
  { code: 'CH', name: 'Chemical Engineering', icon: '🧪' },
  { code: 'AU', name: 'Automobile Engineering', icon: '🚘' },
  { code: 'CE', name: 'Civil Engineering', icon: '🏛️' },
  { code: 'ME', name: 'Mechanical Engineering', icon: '🔧' },
  { code: 'EE', name: 'Electrical Engineering', icon: '🔌' },
  { code: 'ET', name: 'Electronics & Telecommunication', icon: '📡' },
];

export const SEMS = [1, 2, 3, 4, 5, 6];

export const DEMO_PAPERS: Paper[] = [
  { id: '1', branch: 'CO', sem: 3, subject: 'Data Structures Using C', code: '22317', year: '2024', scheme: 'K', paperType: 'Model Answer', season: 'Winter', pdfUrl: '#' },
  { id: '2', branch: 'CO', sem: 3, subject: 'Digital Techniques', code: '22318', year: '2024', scheme: 'K', paperType: 'Model Answer', season: 'Winter', pdfUrl: '#' },
  { id: '3', branch: 'CO', sem: 4, subject: 'Operating System', code: '22416', year: '2024', scheme: 'K', paperType: 'Model Answer', season: 'Summer', pdfUrl: '#' },
  { id: '4', branch: 'CO', sem: 5, subject: 'Advanced Java Programming', code: '22517', year: '2024', scheme: 'K', paperType: 'Model Answer', season: 'Winter', pdfUrl: '#' },
  { id: '5', branch: 'ME', sem: 3, subject: 'Strength of Materials', code: '22306', year: '2024', scheme: 'K', paperType: 'Model Answer', season: 'Winter', pdfUrl: '#' },
  { id: '6', branch: 'CE', sem: 4, subject: 'Surveying', code: '22404', year: '2024', scheme: 'K', paperType: 'Model Answer', season: 'Summer', pdfUrl: '#' },
  { id: '7', branch: 'EE', sem: 3, subject: 'Electrical Machines-I', code: '22310', year: '2024', scheme: 'K', paperType: 'Question Paper', season: 'Winter', pdfUrl: '#' },
  { id: '8', branch: 'CO', sem: 3, subject: 'Data Structures Using C', code: '22317', year: '2023', scheme: 'K', paperType: 'Model Answer', season: 'Summer', pdfUrl: '#' },
];

export const getBranch = (code: string) => BRANCHES.find(b => b.code === code);
