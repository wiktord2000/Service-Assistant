            
export interface Service {
    id: number
    name: string
    costNet: number;
    costGross: number;
    unit: string;
    estimatedTime: number;
    totalNet: number;
    totalGross: number;
    createdAt: Date;  
    updatedAt: Date;  
}