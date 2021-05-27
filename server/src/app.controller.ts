import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(@Res() res:any) {
    // console.log(path.resolve('./public/build/index.html'));
    
    return res.sendFile(path.resolve('./public/build/index.html'))
    // return this.appService.getHello();
  }

  @Get('/hello')
  getFHello(): string {
    return this.appService.getHello();
  }
}
