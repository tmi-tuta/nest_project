import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendModule } from './backend/backend.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BackendModule,
    MongooseModule.forRoot('mongodb://mongo:27017/nestjs-database'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
