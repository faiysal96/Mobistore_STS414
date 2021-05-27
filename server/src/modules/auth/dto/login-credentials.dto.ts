import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches, IsDefined, IsEmail } from 'class-validator';

export class LoginCredentialsDto {

  @IsDefined()
  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({default: 'test@mail.com'})
  readonly email: string;

  @IsDefined()  
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({default: 'test1123'})
  // @Matches(
  //   /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  //   { message: 'password too weak' },
  // )
  readonly password: string;
}
