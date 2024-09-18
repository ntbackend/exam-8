import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from '../models';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Car.name, schema: CarSchema}])],
  controllers: [CarsController],
  providers: [CarsService, UploadService],
})
export class CarsModule {}
