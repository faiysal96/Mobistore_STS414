import { UserRole } from '../user-role.enum';
export declare class UpdateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    phone: string;
    role: UserRole;
}
