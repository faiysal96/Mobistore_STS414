import { UserRole } from '../user-role.enum';
import { AbstractDto } from '../../../common/dto/abstract.dto';
export declare class UserDto extends AbstractDto {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    salt: string;
    role: UserRole;
}
