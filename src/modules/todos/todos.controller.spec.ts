import { Test } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import mongoose, { Document } from 'mongoose';
import { Todo, TodoDocument } from './entities/todo.entity';

describe('TodosController', () => {
  let todosController: TodosController;
  let todosService: TodosService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        TodosService,
        {
          provide: getModelToken(Todo.name),
          useValue: TodoModel, // <-- Use the Model Class from Mongoose
        },
      ],
    }).compile();

    todosService = moduleRef.get<TodosService>(TodosService);
    todosController = moduleRef.get<TodosController>(TodosController);
  });

  describe('getAll', () => {
    it('should return an array of todos', async () => {
      const result = [
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

      jest
        .spyOn(todosService, 'findAll')
        .mockImplementation(async () => result);

      expect(await todosController.getAll()).toBe([
        {
          todoId: '66e428fab43864d2186b5a7b',
          todoName: 'todo update 1acds',
          description: 'des update',
          createdAt: '2024-09-13T11:58:50.873Z',
          updatedAt: '2024-09-15T11:24:00.953Z',
        },
        {
          todoId: '66e42c946260ebd44106a670',
          todoName: 'kakakak update zzzzx',
          description: 'zipooooooo update',
          createdAt: '2024-09-13T12:14:12.787Z',
          updatedAt: '2024-09-13T12:17:02.331Z',
        },
      ]);
    });
  });
});
