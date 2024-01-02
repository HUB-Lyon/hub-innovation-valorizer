import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/public';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user';

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
  test(@User() user): string {
    console.log(user);
    return this.appService.getHello();
  }
}
