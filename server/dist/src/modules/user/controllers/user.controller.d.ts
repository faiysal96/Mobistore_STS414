import { UserService } from '../services/user.service';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UserController {
    private userService;
    private logger;
    constructor(userService: UserService);
    deleteUser(id: number, user: UserEntity): Promise<any>;
    updateUserInfo(updateUserDto: UpdateUserDto, user: UserEntity): Promise<UserDto>;
    getUser(id: number, user: UserEntity): Promise<UserDto>;
    getUsers(page?: number, limit?: number): Promise<UserDto[]>;
    createUser(createUserDto: CreateUserDto, user: UserEntity): Promise<UserDto>;
}
