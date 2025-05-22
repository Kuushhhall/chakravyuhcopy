export interface TeacherProfile {
  id: string;
  name: string;
  subject: string;
  avatar: string;
  description: string;
  style: string;
}

export const teacherProfiles: TeacherProfile[] = [
  {
    id: 'physics1',
    name: 'Dr. Sharma',
    subject: 'Physics',
    avatar: '/images/teachers/physics1.jpg',
    description: 'IIT Delhi graduate with 15 years teaching experience',
    style: 'Structured and analytical approach'
  },
  {
    id: 'physics2',
    name: 'Prof. Gupta',
    subject: 'Physics',
    avatar: '/images/teachers/physics2.jpg',
    description: 'Specializes in conceptual understanding',
    style: 'Interactive and engaging'
  },
  {
    id: 'physics3',
    name: 'Ms. Patel',
    subject: 'Physics',
    avatar: '/images/teachers/physics3.jpg',
    description: 'Focuses on problem-solving techniques',
    style: 'Practical examples and applications'
  },
  {
    id: 'math1',
    name: 'Dr. Kumar',
    subject: 'Mathematics',
    avatar: '/images/teachers/math1.jpg',
    description: 'PhD in Applied Mathematics',
    style: 'Theoretical foundations with real-world applications'
  },
  {
    id: 'chem1',
    name: 'Dr. Singh',
    subject: 'Chemistry',
    avatar: '/images/teachers/chem1.jpg',
    description: 'Specializes in organic chemistry',
    style: 'Visual and mnemonic-based learning'
  }
];
