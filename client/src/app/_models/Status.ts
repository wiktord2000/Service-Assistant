export interface Status {
    id: number;
    position: number;
    name: string;
    finished: boolean;
    isPaid: boolean;
    hasInvoice: boolean;
    emailSend: boolean;
}