import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './entities/todo.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodosController],
  providers: [
    TodosService,
    // {
    //   provide: getModelToken(Todo.name),
    //   useValue: todoModel,
    // },
  ],
  exports: [TodosService],
})
export class TodosModule {}
