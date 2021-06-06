import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RoleGuard implements CanActivate {
    roleTOCheck: string;
    constructor(role: string);
    canActivate(context: ExecutionContext): boolean;
}
