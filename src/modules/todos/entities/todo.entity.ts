import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ timestamps: true })
export class Todo {
  @Prop({
    type: String,
    required: true,
  })
  todoName: string;

  @Prop({
    type: String,
  })
  description?: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: Date })
  deletedAt?: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
