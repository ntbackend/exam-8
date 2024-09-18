import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';
import { UploadService } from '../upload/upload.service';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Cobalt' },
        description: {
          type: 'string',
          example: "Ushbu mashina O'zbekistonda ishlab chiqarilgan",
        },
        price: { type: 'number' },
        status: { type: 'string', enum: ['new', 'used'] },
        city: { type: 'string', example: 'Uzbekistan' },
        year: { type: 'string', example: 2023 },
        model: { type: 'string', example: 'Chevrolet' },
        phone: { type: 'string', example: '+998 94 385 14 56' },
        telegram: { type: 'string', example: 'https://t.me/ibrokhimjoraboyev' },
        imageUrl: { type: 'string', format: 'url', nullable: true },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 10))
  async create(
    @Body() createCarDto: CreateCarDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    let imageUrls = [];

    if (files && files.length > 0) {
      imageUrls = await Promise.all(
        files.map((file) => this.uploadService.create(file)),
      );
    }

    return this.carsService.create({
      ...createCarDto,
      imageUrl: imageUrls,
    });
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Cobalt' },
        description: {
          type: 'string',
          example: "Ushbu mashina O'zbekistonda ishlab chiqarilgan",
        },
        price: { type: 'number' },
        status: { type: 'string', enum: ['new', 'used'] },
        city: { type: 'string', example: 'Uzbekistan' },
        year: { type: 'string', example: 2023 },
        model: { type: 'string', example: 'Chevrolet' },
        phone: { type: 'string', example: '+998 94 385 14 56' },
        telegram: { type: 'string', example: 'https://t.me/ibrokhimjoraboyev' },
        imageUrl: { type: 'string', format: 'url', nullable: true },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 10))
  async update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const existingCar = await this.carsService.findOne(id);

    let imageUrls = existingCar.imageUrl;

    if (files && files.length > 0) {
      imageUrls = await Promise.all(
        files.map((file) => this.uploadService.create(file)),
      );
    }

    return this.carsService.update(id, {
      ...updateCarDto,
      imageUrl: imageUrls,
    });
  }
}
