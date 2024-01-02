import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/public';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user';
import { AdminGuard } from './guards/admin';
import { HIVUser } from './users/schema/user.interface';

@ApiTags('Common')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  @UseGuards(AdminGuard)
  test(@User() user: HIVUser): string {
    console.log(user);
    return this.appService.getHello();
  }
}
