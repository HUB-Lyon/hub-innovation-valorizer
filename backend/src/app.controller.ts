import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './global/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req): string {
    console.log('signed-in user:', req['user']);
    return this.appService.getHello();
  }

  @Get('public')
  @Public()
  getHelloPublic(@Req() req): string {
    return this.appService.getHello();
  }
}
