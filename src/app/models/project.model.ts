import { Industry } from './industry.model';
import { Tag } from './tag.model';

export interface Project {
    id: number;
    name?: string;
    description?: string;
    progress?: number;
    projectSkills?: string;
    industry?: string;
    tags?: Tag[];
}

