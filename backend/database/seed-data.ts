
interface SeedData {
    entries: SeddEntry[]
}


interface SeddEntry{
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries:[
        {
            description: 'Pendiente: Lorem ipsum dolo elit. fugit. Ipsam eligendi',
            status: 'pending',
            createdAt: 30
        },
        {
            description: 'Finish: Lorem ipsum  Ipsam eligendi',
            status: 'finished',
            createdAt: 30
        },
        {
            description: 'In-Progress: fugit. Ipsam eligendi',
            status: 'in-progress',
            createdAt: 30
        }
    ]
}