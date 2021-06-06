import { UserRole } from '../user-role.enum';
export declare class CreateUserDto {
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly password: string;
    phone: string;
    role: UserRole;
}
