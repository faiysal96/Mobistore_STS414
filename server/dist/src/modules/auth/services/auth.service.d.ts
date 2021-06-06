import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/modules/user/user.entity';
import { AuthRepository } from '../repositories/auth.repository';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import { RegisterCredentialsDto } from '../dto/register-credentials.dto';
import { UserDto } from '../../user/dto/user.dto';
import { UserInfo } from '../dto/userinfo.dto';
export declare class AuthService {
    private authRepository;
    private jwtService;
    private logger;
    constructor(authRepository: AuthRepository, jwtService: JwtService);
    signUp(registerCredentialsDto: RegisterCredentialsDto): Promise<UserInfo>;
    signIn(loginCredentialsDto: LoginCredentialsDto): Promise<UserInfo>;
    getAuthenticatedUser(user: UserEntity): UserDto;
}
