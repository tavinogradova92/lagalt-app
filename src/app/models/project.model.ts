import { User } from './user.model';
import { ProjectSkill } from './project-skill.model';

export interface Project {
    id?: number;
    name: string;
    description?: string;
    dateCreated?: Date;
    projectImage?: number;
    deleted?: boolean;
    projectOwners?: User[];
    projectActiveUsers: User[];
    progress?: number;
    neededSkills?: ProjectSkill[];
    industry?: string;
    tags?: String[];
    projectImageUri: String;
}

