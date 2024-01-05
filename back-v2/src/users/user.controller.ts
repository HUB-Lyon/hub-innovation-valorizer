import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { HIVUser } from './schema/user.interface';
import { User } from 'src/decorators/user';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getUsers(): Promise<Array<HIVUser>> {
    return await this.userService.findAll();
  }

  @Get('/me')
  getMe(@User() me: HIVUser): HIVUser {
    return me;
  }
}
