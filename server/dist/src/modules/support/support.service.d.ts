import { SupportDto, UpdateSupportDto } from './support.dto';
import { SupportRepository } from './support.repository';
export declare class SupportService {
    private readonly supportRepo;
    constructor(supportRepo: SupportRepository);
    getById(id: number): Promise<any>;
    getAll(): Promise<any>;
    getByUser(userId: number): Promise<any>;
    getByPendingStatusUser(userId: number): Promise<any>;
    addSupportIsuue(supportDto: SupportDto, userId: number): Promise<any>;
    updateSupportConversion(conv: UpdateSupportDto[], id: number): Promise<any>;
    updateSupportStatus(status: string, id: number): Promise<any>;
}
