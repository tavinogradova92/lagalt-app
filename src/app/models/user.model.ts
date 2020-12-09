export interface User {
  id: number;
  name?: string;
  description?: string;
  email?: string;
  image?: string;
  hidden?: boolean;
  projects?: number[];
  skills?: any[];
}
