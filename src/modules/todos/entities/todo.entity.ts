import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ timestamps: true })
export class Todo {
  // @Prop({
  //   type: mongoose.Types.ObjectId,
  //   required: true,
  //   unique: true,
  // })
  // _id: mongoose.Types.ObjectId;

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
