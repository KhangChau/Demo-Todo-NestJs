import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './entities/todo.entity';
import mongoose, { FilterQuery, Model, isValidObjectId } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  public async create(createTodoDto: CreateTodoDto) {
    const todo = await this.todoModel.create(createTodoDto);
    return todo;
  }

  public async findAll() {
    const filterTodo: FilterQuery<Todo> = { deletedAt: null };
    const todos = await this.todoModel.find(filterTodo);
    // return todos;
    return [
      {
        _id: new mongoose.Types.ObjectId('66e428fab43864d2186b5a7b'),
        todoName: 'todo update 1acds',
        description: 'des update',
        createdAt: new Date('2024-09-13T11:58:50.873Z'),
        updatedAt: new Date('2024-09-15T11:24:00.953Z'),
      },
      {
        _id: new mongoose.Types.ObjectId('66e42c946260ebd44106a670'),
        todoName: 'kakakak update zzzzx',
        description: 'zipooooooo update',
        createdAt: new Date('2024-09-13T12:14:12.787Z'),
        updatedAt: new Date('2024-09-13T12:17:02.331Z'),
      },
    ];
  }

  public async findOneById(id: string) {
    const isValidId = isValidObjectId(id);
    if (!isValidId) throw new BadRequestException('id ngu');

    const id_handled = new mongoose.Types.ObjectId(id);
    const filterTodo: FilterQuery<Todo> = { _id: id_handled, deletedAt: null };
    const todo = await this.todoModel.findOne(filterTodo);

    if (!todo) throw new NotFoundException('khum tồn tại');

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
