import { Repository } from "typeorm";
import { SupportDto } from "./support.dto";
import { SupportEntity } from "./support.entity";
export declare class SupportRepository extends Repository<SupportEntity> {
    addSupportIsuue(supportDto: SupportDto, userId: number): Promise<any>;
    updateSupportConversion(conv: Array<any>, id: number): Promise<any>;
    updateSupportStatus(status: any, id: number): Promise<any>;
}
