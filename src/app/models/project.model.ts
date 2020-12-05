import { Industry } from './industry.model';
import { Tag } from './tag.model';

export interface Project {
    id: number;
    name?: string;
    description?: string;
    progress?: number;
    industry?: Industry;
    tags?: Tag[];
}

