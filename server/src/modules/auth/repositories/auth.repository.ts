import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../../user/user.entity';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import { RegisterCredentialsDto } from '../dto/register-credentials.dto';
import { UserDto } from '../../user/dto/user.dto';
import { plainToClass } from 'class-transformer';
import { use } from 'passport';

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity> {
  private logger = new Logger('AuthRepository');

  async signUp(registerCredentialsDto: RegisterCredentialsDto): Promise<any> {
    const { email, password } = registerCredentialsDto;

    const user = new UserEntity();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.firstName = registerCredentialsDto.firstName;
    user.lastName = registerCredentialsDto.lastName;
    user.phone = registerCredentialsDto.phone;


    try {
      const registredUser: UserEntity = await this.save(user);
      return { email: registredUser.email, role: registredUser.role, name: registredUser.firstName + ' ' + registredUser.lastName };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error.code === '23505') { // duplicate username
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(loginCredentialsDto: LoginCredentialsDto): Promise<any> {
    const { email, password } = loginCredentialsDto;
    const user = await this.findOne({ email });

    if (user && await user.validatePassword(password)) {
      return { email: user.email, role: user.role, name: user.firstName + ' ' + user.lastName };
    } 
    return {email :null };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
