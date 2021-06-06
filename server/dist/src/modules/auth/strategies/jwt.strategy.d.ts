import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthRepository } from '../repositories/auth.repository';
import { UserEntity } from 'src/modules/user/user.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authRepository;
    constructor(authRepository: AuthRepository);
    validate(payload: JwtPayload): Promise<UserEntity>;
}
export {};
