import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsPhoneNumber,
  IsOptional,
  IsDefined,
  IsEmail,
} from 'class-validator';

export class RegisterCredentialsDto {

  @IsDefined()  
  @IsString()
  @IsEmail()
  @ApiProperty({default: 'test@mail.com'})
  readonly email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({default: 'Test'})
  readonly firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({default: 'Test'})
  readonly lastName: string;

  @IsDefined()  
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({default: 'test1123'})

  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  readonly password: string;

  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}
