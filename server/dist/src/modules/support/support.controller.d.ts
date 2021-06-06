import { UserEntity } from '../user/user.entity';
import { StatusSupportDto, SupportDto, UpdateSupportDto } from './support.dto';
import { SupportService } from './support.service';
export declare class SupportController {
    private supportService;
    constructor(supportService: SupportService);
    getAll(): Promise<any>;
    getMyPendingIssues(user: UserEntity): Promise<any>;
    getMyIssues(user: UserEntity): Promise<any>;
    getById(user: UserEntity, issueId: number): Promise<any>;
    getSellerProducts(user: UserEntity, issue: SupportDto): Promise<any>;
    updateIssueConv(user: UserEntity, issueId: number, conv: UpdateSupportDto[]): Promise<any>;
    updateIssueStatus(user: UserEntity, issueId: number, status: StatusSupportDto): Promise<any>;
}
