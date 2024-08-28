import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    try {
      const resPerPage = 2;
      const currentPage = Number(query.page) || 1;
      const skip = resPerPage * (currentPage - 1);
      const keyword = query.keyword
        ? {
            title: {
              $regex: query.keyword,
              $option: 'i',
            },
          }
        : {};
      const books = await this.bookModel
        .find({ ...keyword })
        .limit(resPerPage)
        .skip(skip);
      return books;
    } catch (error) {
      console.error('Loi lay danh sach:', error.message);
    }
  }

  async create(book: Book): Promise<Book> {
    try {
      const res = await this.bookModel.create(book);
      return res;
    } catch (error) {
      console.error('Loi tao moi sach:', error.message);
    }
  }

  async findById(id: string): Promise<Book> {
    try {
      const book = await this.bookModel.findById(id);
      if (!book) {
        throw new NotFoundException('Không tìm thấy sách');
      }
      return book;
    } catch (error) {
      console.error('Loi chi tiet sach:', error.message);
    }
  }

  async updateById(id: string, book: Book): Promise<Book> {
    try {
      const res = await this.bookModel.findByIdAndUpdate(id, book, {
        new: true,
        runValidators: true,
      });
      return res;
    } catch (error) {
      console.error('Loi cap nhat sach:', error.message);
    }
  }

  async deleteById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
