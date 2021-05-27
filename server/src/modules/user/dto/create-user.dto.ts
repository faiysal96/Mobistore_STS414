import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsNotEmpty,
    IsPhoneNumber,
    IsOptional,
    IsDefined,
    IsIn,
    IsEmail,
  } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {

    
  @IsDefined()  
  @IsString()
  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly lastName: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  @IsOptional()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @ApiProperty({enum: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER, UserRole.GHOST, UserRole.GUEST]})
  @IsIn([UserRole.ADMIN, UserRole.MANAGER, UserRole.USER, UserRole.GHOST, UserRole.GUEST])
  role: UserRole;
}
