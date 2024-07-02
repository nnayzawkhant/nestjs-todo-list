import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { PostsModule } from './posts/posts.module';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { extname } from 'path';
import { AuthController } from './auth/auth.controller';
import { PostsController } from './posts/posts.controller';
import { AuthService } from './auth/auth.service';
import { PostsService } from './posts/posts.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
    AuthModule,
    PrismaModule,
    UsersModule,
    TodosModule,
    PostsModule,
  ],
  controllers: [AuthController, PostsController],
  providers: [AuthService, PostsService, PrismaService, JwtService, UsersService],
})
export class AppModule {}
