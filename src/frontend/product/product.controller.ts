import { Controller, Get } from "@nestjs/common";


@Controller('product')
export class ProductController {
  @Get('lists')
  async getListsProducts() {
    return 'products page';
  }
}