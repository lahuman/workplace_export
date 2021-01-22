import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiResponse, ApiTags, ApiOperation
} from '@nestjs/swagger';

@ApiTags('hello')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'hello api',
    type: String,
  })
  @ApiOperation({ summary: 'Test api return "hello"' })
  getHello(): string {
    return this.appService.getHello();
  }
}
