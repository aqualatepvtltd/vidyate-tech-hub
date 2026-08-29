import {CertificationCourse } from '../types';

export const CERTIFICATION_COURSES: CertificationCourse[] = [
  {
    id: 'intro-to-ai',
    name: 'Introduction to Artificial Intelligence',
    description: 'Learn the fundamentals of Artificial Intelligence, including its history, applications, and basic concepts. This course provides a solid foundation for understanding AI technologies and their impact on various industries.',
    difficulty: 'Basic',
    materialLink: 'https://drive.google.com/file/d/1GvNLnA7osGu8iyTC-iOdHnNYUFf5VsOm/view?usp=sharing',
    testLink: 'https://forms.gle/Uj2uu2SSxuC91eAM6',
    isPaid: false,
    quiz: false,
  },
   {
    id: 'js-react-core',
    name: 'JavaScript & React Core Competency ',
    description: 'JavaScript is the backbone of modern web development, and React is one of the most popular libraries for building user interfaces. This course covers essential JavaScript concepts and dives into React fundamentals, enabling you to create dynamic and responsive web applications.',
    difficulty: 'Quiz',
    materialLink: '#',
    testLink: 'https://forms.gle/UjwANH1awMZYKjV66',
    isPaid: false,
    quiz: true,
  },
];
