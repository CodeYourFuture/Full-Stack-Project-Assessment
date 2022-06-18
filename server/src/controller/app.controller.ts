import { Body, Controller, Delete, Get,Param,Post } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { CreateUrlDto } from '../interface/urlInterface'
import {UrlInterface,ErrorUrl} from './interface/interfaceUrl'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllUrl(): UrlInterface[] {
    return this.appService.getHello();
  }
  
  @Post()
  postUrl(@Body() bodyUrl: CreateUrlDto): any {
    const returnFromPostUrl = this.appService.postUrl(bodyUrl);
    if (typeof returnFromPostUrl.id === 'number') {
      return returnFromPostUrl.id;
    } else {
      return {
        result: 'failure',
        message: 'Video could not be saved',
      };
    }
  }

  @Get(':id')
  getById(@Param('id') id: string): UrlInterface[] | ErrorUrl {
    const urlById = this.appService.getById(id);
    if (urlById.length > 0) return urlById;
    return {
      result: 'failure',
      message: 'Video not found',
    };
  }

  @Delete(':id')
  deleteUrlById(@Param('id') id: string): string | ErrorUrl {
    const response = this.appService.deleteById(id);
    if (response === 'Deleted') return 'Deleted';
    return {
      result: 'failure',
      message: 'Video could not be deleted',
    };
  }
}
