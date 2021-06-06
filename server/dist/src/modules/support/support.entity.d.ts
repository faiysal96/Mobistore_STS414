import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from '../user/user.entity';
export declare class SupportEntity extends AbstractEntity {
    title: string;
    description: string;
    conversation: string;
    status: string;
    userId: number;
    user: UserEntity;
}
