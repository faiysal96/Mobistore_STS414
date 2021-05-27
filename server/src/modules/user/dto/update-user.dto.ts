import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
  IsDefined,
  IsIn,
} from 'class-validator';
import { UserRole } from '../user-role.enum';

export class UpdateUserDto {

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly lastName: string;

  @IsOptional()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @ApiProperty()
  @IsIn([UserRole.ADMIN, UserRole.MANAGER, UserRole.USER, UserRole.GHOST, UserRole.GUEST])
  role: UserRole;
}
