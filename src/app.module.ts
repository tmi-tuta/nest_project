import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendModule } from './backend/backend.module';
import { FrontendModule } from './frontend/frontend.module';
import { ProductController } from './frontend/product/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './frontend/product/product.service';

@Module({
  imports: [
    BackendModule,
    FrontendModule,
    MongooseModule.forRoot('mongodb://mongo:27017/nestjs-database'),
  ],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}
