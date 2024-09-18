import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CarStatus } from '../../models';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({ example: 'Cobalt' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "Ushbu mashina O'zbekistonda ishlab chiqarilgan" })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({example: 20000})
  @IsNotEmpty()
  price: number;

  @ApiProperty({example: "new"})
  @IsEnum(CarStatus)
  status: CarStatus;

  @ApiProperty({example: "Tashkent"})
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({example: "2023"})
  @IsNotEmpty()
  @IsString()
  year: string;

  @ApiProperty({example: "Chevrolet"})
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({example: "+998 94 385 14 56"})
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({example: "https://t.me/ibrokhimjoraboyev"})
  @IsNotEmpty()
  @IsString()
  telegram: string;

  
  @ApiProperty({
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    type: [String],
  })
  @IsOptional()
  @IsString({ each: true })
  imageUrl?: string[];
}
