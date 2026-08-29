
export interface CertificationCourse {
  id: string;
  name: string;
  description: string;
  difficulty: 'Basic' | 'Advance' | 'Quiz';
  materialLink: string;
  testLink: string;
  isPaid?: boolean;
  quiz?: boolean;
}
