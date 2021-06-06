import { AuthService } from '../services/auth.service';
import { UserEntity } from '../../user/user.entity';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import { RegisterCredentialsDto } from '../dto/register-credentials.dto';
import { UserDto } from '../../user/dto/user.dto';
import { UserInfo } from '../dto/userinfo.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(registerCredentialsDto: RegisterCredentialsDto): Promise<UserInfo>;
    signIn(loginCredentialsDto: LoginCredentialsDto): Promise<UserInfo>;
    getAuthenticatedUser(user: UserEntity): UserDto;
}
