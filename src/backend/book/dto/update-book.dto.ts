import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../schema/book.schema';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsEnum(Category, { message: 'Vui lòng nhập đúng danh mục.' })
  readonly category: Category;
}
