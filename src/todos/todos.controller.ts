import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Request,
    Query,
  } from '@nestjs/common';
  import { TodosService } from './todos.service';
  import { CreateTodoDto } from './dto/create-todo.dto';
  import { SearchTodoDto } from './dto/search-todo.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
  
  @ApiTags('todos')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Controller('todos')
  export class TodosController {
    constructor(private readonly todosService: TodosService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new todo' })
    @ApiResponse({ status: 201, description: 'The todo has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
      return this.todosService.create(createTodoDto, req.user.userId);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all todos' })
    @ApiQuery({ name: 'title', required: false })
    @ApiQuery({ name: 'isCompleted', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'List of todos' })
    findAll(@Request() req, @Query() searchTodoDto: SearchTodoDto) {
      // Convert isCompleted to boolean if it's a string
      if (typeof searchTodoDto.isCompleted === 'string') {
        searchTodoDto.isCompleted = searchTodoDto.isCompleted === 'true';
      }
      return this.todosService.findAll(req.user.userId, searchTodoDto);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a single todo' })
    @ApiResponse({ status: 200, description: 'The todo' })
    @ApiResponse({ status: 404, description: 'Todo not found' })
    findOne(@Param('id') id: string, @Request() req) {
      return this.todosService.findOne(+id, req.user.userId);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a todo' })
    @ApiResponse({ status: 200, description: 'The todo has been deleted' })
    @ApiResponse({ status: 404, description: 'Todo not found' })
    remove(@Param('id') id: string, @Request() req) {
      return this.todosService.remove(+id, req.user.userId);
    }
  }
  