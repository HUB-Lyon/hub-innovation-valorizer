import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './global/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('public')
  @Public()
  getHelloPublic(): string {
    return this.appService.getHello();
  }
}
