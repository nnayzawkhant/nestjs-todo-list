import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  create(createTodoDto: CreateTodoDto, userId: number) {
    return this.prisma.todo.create({
      data: {
        title: createTodoDto.title,
        completed: createTodoDto.completed ?? false,
        userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }

  findOne(id: number, userId: number) {
    return this.prisma.todo.findFirst({
      where: { id, userId },
    });
  }

  remove(id: number, userId: number) {
    return this.prisma.todo.deleteMany({
      where: { id, userId },
    });
  }
}
