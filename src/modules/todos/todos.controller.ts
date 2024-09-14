import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SerializeOptions,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto } from './dto/todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @SerializeOptions({ type: TodoDto })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @SerializeOptions({ type: TodoDto })
  getAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @SerializeOptions({ type: TodoDto })
  getOneById(@Param() id: string) {
    return this.todosService.findOneById(id);
  }

  @Patch(':id')
  @SerializeOptions({ type: TodoDto })
  updateOneById(@Param() id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.updateOneById(id, updateTodoDto);
  }

  @Delete(':id')
  @SerializeOptions({ type: TodoDto })
  deleteOneById(@Param() id: string) {
    return this.todosService.deleteOneById(id);
  }
}
