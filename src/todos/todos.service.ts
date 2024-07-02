import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { SearchTodoDto } from './dto/search-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    return this.prisma.todo.create({
      data: {
        ...createTodoDto,
        userId,
      },
    });
  }

  async findAll(userId: number, searchParams?: SearchTodoDto) {
    const { title, isCompleted } = searchParams || {};
    return this.prisma.todo.findMany({
      where: {
        userId,
        title: title ? { contains: title } : undefined,
        isCompleted: typeof isCompleted === 'boolean' ? isCompleted : undefined,
      },
    });
  }

  async findOne(id: number, userId: number) {
    return this.prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async remove(id: number, userId: number) {
    return this.prisma.todo.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}
