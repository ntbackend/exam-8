import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSuggestionDto {
  @ApiProperty({ example: 'This is a great idea!' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'Ibrohim' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '+998 94 385 14 56' })
  @IsNotEmpty()
  @IsString()
  phone: string;
}
