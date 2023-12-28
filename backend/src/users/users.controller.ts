import { Controller, HttpCode, HttpStatus, Req, Res, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities/user.entity'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  @ApiOkResponse({ type: User, description: 'Get user info' })
  async getUserInfo(@Req() req, @Res() res) {
    const user = await this.usersService.getInfoByEmail(req['user']['preferred_username']);
    return res.status(HttpStatus.OK).json(user);
  }
}
