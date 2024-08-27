import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/users.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
        inject: [ConfigService],
        userFactory: (config: ConfigService) => {
            return {
                secret: config.get('JWT_SECRET'),
                signOptions: config.get('JWT_EXPIRE'),
            }
        }
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
],
})
export class AuthModule {}
