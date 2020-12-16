import { User } from 'src/app/models/user.model';
export interface Session {
  token: string;
  user: User;
}
