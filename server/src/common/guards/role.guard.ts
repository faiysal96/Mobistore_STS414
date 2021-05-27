import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
    roleTOCheck: string;
    constructor(role: string) {
        this.roleTOCheck = role
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user.role == 'ADMIN' || user.role == this.roleTOCheck;
    }
}
