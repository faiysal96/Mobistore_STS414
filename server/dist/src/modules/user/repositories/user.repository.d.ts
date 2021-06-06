import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
export declare class UserRepository extends Repository<UserEntity> {
    private logger;
    createUser(createUserDto: CreateUserDto, user: UserEntity): Promise<UserDto>;
}
