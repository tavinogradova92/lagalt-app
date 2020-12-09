import { User } from './user.model';
import { ProjectSkill } from './project-skill.model';
import { Tag } from './tag.model';

export interface Project {
    id: number;
    name?: string;
    description?: string;
    dateCreated?: Date;
    deleted?: boolean;
    projectOwners: User[];
    projectActiveUsers: User[];
    progress?: number;
    neededSkills?: ProjectSkill[];
    industry?: string;
    tags?: Tag[];
}

