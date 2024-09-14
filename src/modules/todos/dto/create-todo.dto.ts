import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  // @MaxLength(255)
  readonly todoName: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  // @MaxLength(1024)
  readonly description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  // @MaxLength(1024)
  readonly deleteAt?: Date;
}
