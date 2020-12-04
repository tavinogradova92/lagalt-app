export interface User {
  id: number;
  name: string;
  description: string;
  email: string;
  hidden: boolean;
  projects: number[];
  skill: number[];
}
