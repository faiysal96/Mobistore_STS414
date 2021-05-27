import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  Delete,
  Post,
  ValidationPipe,
  Body,
  Logger,
  UsePipes,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dto/user.dto';
import { AuthUser } from '../../../common/decorators';
import { UserEntity } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RoleGuard } from 'src/common/guards';
import { SetMetadata } from '@nestjs/common';

@Controller('api/users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  private logger = new Logger('UserController');

  constructor(private userService: UserService) { }

 

  @Delete('/:id')
  @UseGuards(new RoleGuard('ADMIN'))
  deleteUser(@Param('id', ParseIntPipe) id: number,
    @AuthUser() user: UserEntity): Promise<any> {
    return this.userService.deleteUser(id, user);
  }

  // @Put('/:id')
  // @UsePipes(ValidationPipe)
  // updateUser(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<UserDto> {
  //   return this.userService.updateUser(id, updateUserDto);
  // }

  @Put('update')
  @UsePipes(ValidationPipe)
  updateUserInfo(
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() user: UserEntity,
  ): Promise<UserDto> {
    console.log("WDFdsfsdfsd");
    
    return this.userService.updateUser(user.id, updateUserDto);
  }

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number, @AuthUser() user: UserEntity): Promise<UserDto> {
    return this.userService.getUserById(id, user);
  }

  @Get('')
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  getUsers(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<UserDto[]> {
    return this.userService.getUsers(
      {
        page,
        limit
      }
    );
  }

  

  @Post('')
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @UsePipes(ValidationPipe)
  createUser(
    @Body() createUserDto: CreateUserDto,
    @AuthUser() user: UserEntity
  ): Promise<UserDto> {
    return this.userService.createUser(createUserDto, user);
  }
}
