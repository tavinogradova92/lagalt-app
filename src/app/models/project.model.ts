import { User } from './user.model';
import { ProjectSkill } from './project-skill.model';
import { Industry } from './industry.model';

export interface Project {
  id?: number;
  name: string;
  description?: string;
  dateCreated?: Date;
  projectImage?: string;
  deleted?: boolean;
  projectOwners?: User[];
  projectActiveUsers: User[];
  progress?: number;
  neededSkills?: ProjectSkill[];
  industry?: Industry;
  tags?: string[];
}
