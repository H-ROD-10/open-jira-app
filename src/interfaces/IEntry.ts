


export interface IEntry{
    _id?: string;
    description: string;
    createdAt: number;
    status: StatusEntry;
}

export type StatusEntry = 'pending' | 'in-progress' | 'finished'
   