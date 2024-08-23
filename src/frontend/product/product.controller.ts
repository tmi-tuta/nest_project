import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private ProductService: ProductService) {}
  @Get('lists')
  async getListsProducts() {
    return await this.ProductService.get();
  }
}
