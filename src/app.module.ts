import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, TodosModule],
})
export class AppModule {}
