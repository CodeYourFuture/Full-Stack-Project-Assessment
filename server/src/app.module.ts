import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';

@Module({
  imports: [
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
