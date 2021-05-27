import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '../user-role.enum';
import { AbstractDto } from '../../../common/dto/abstract.dto';

@Exclude()
export class UserDto extends AbstractDto{

    @Expose()
    email: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    phone: string;
    
    password: string;

    salt: string;

    @Expose()
    role: UserRole;
}
