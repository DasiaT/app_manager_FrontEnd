export interface IWorstation {
    id: number;
    name: string;
}

export interface IWorstationFilters {
    id?:number;
    search?: string;
    skip?: number;
    take?: number;
}

export interface IWorstationPost {
    name: string;
}

export interface IWorstationPatch {
    id: number;
    name: string;
}

export interface IWorstationDelete {
    id: number;
}