import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './modules/todos/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todo_test'),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
