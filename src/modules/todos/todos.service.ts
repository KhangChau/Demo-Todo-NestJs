import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './entities/todo.entity';
import mongoose, { FilterQuery, Model, isValidObjectId } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  public async create(createTodoDto: CreateTodoDto) {
    const todo = await this.todoModel.create(createTodoDto);
    return todo;
  }

  public async findAll() {
    const filterTodo: FilterQuery<Todo> = { deletedAt: null };
    return await this.todoModel.find(filterTodo);
  }

  public async findOneById(id: string) {
    const isValidId = isValidObjectId(id);
    if (!isValidId) throw new BadRequestException('id ngu');

    const id_handled = new mongoose.Types.ObjectId(id);
    const filterTodo: FilterQuery<Todo> = { _id: id_handled, deletedAt: null };
    const todo = await this.todoModel.findOne(filterTodo);

    if (!todo) throw new NotFoundException('id khum tồn tại');

    return todo;
  }

  public async updateOneById(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOneById(id);
    const filterTodo: FilterQuery<Todo> = {
      ...updateTodoDto,
      updatedAt: new Date(),
    };
    await todo.updateOne(filterTodo);
    return this.findOneById(id);
  }

  public async deleteOneById(id: string) {
    const todo = await this.findOneById(id);
    const filterTodo: FilterQuery<Todo> = { deletedAt: new Date() };
    await todo.updateOne(filterTodo);
    return true;
  }
}
