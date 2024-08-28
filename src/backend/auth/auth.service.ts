import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/users.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    try {
      const { name, email, password } = signUpDto;
      if (!name || !email || !password) {
        throw new Error('Tất cả các trường là bắt buộc');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      if (!user) {
        throw new Error('Tạo người dùng không thành công');
      }
      const token = this.jwtService.sign({ id: user._id });
      return { token };
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error.message);
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    try {
      const { email, password } = loginDto;
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('Nguoi dung khong ton tai.');
      }
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        throw new UnauthorizedException('Sai mat khau.');
      }
      const token = this.jwtService.sign({ id: user._id });
      return { token };
    } catch (error) {
      console.error('Loi khi dang nhap:', error.message);
    }
  }
}
