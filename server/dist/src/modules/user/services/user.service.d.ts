import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../user.entity';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UserService {
    private readonly userRepository;
    private logger;
    constructor(userRepository: UserRepository);
    getUsers({ page, limit }: {
        page: any;
        limit: any;
    }): Promise<UserDto[]>;
    getUserById(id: number, user: UserEntity): Promise<UserDto>;
    deleteUser(id: number, user: UserEntity): Promise<any>;
    createUser(createUserDto: CreateUserDto, user: UserEntity): Promise<UserDto>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserDto>;
}
