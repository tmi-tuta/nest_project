import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  async get() {
    return 'Danh sach san pham';
  }
}
