import { Repository } from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import { RegisterCredentialsDto } from '../dto/register-credentials.dto';
export declare class AuthRepository extends Repository<UserEntity> {
    private logger;
    signUp(registerCredentialsDto: RegisterCredentialsDto): Promise<any>;
    validateUserPassword(loginCredentialsDto: LoginCredentialsDto): Promise<any>;
    private hashPassword;
}
