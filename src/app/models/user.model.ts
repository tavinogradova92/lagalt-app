export interface User {
  id: number;
  name: string;
  description: string;
  portfolio: string;
  email: string;
  image: string;
  hidden: boolean;
  projects: number[];
  skills: any[];
}
