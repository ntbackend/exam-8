import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Ibrohim' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Joraboyev' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 16 })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({ example: 'ibrohim' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({example: "1234"})
  @IsNotEmpty()
  @IsString()
  password: string
}
