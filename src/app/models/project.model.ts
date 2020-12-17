import { User } from './user.model';
import { ProjectSkill } from './project-skill.model';
import { Byte } from '@angular/compiler/src/util';

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
    industry?: string;
    tags?: String[];
}

