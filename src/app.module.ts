import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendModule } from './backend/backend.module';
import { FrontendModule } from './frontend/frontend.module';
import { ProductController } from './frontend/product/product.controller';

@Module({
  imports: [BackendModule, FrontendModule],
  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}
