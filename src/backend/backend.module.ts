import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/books.module';

@Module({
  imports: [UsersModule, AuthModule, BookModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class BackendModule {}
