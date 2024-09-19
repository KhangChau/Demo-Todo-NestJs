import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TransformObjectId } from '../../../common/transform/transform-object-id';

export class TodoDto {
  @ApiProperty({ name: 'todoId' })
  @Expose({ name: 'todoId' })
  @TransformObjectId()
  _id: string;

  @ApiProperty()
  @Expose()
  todoName: string;

  @ApiProperty()
  @Expose()
  // @Exclude()
  description: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiPropertyOptional()
  @Expose()
  deletedAt?: Date;
}
