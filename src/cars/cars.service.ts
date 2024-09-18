import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto, UpdateCarDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from '../models';
import { Model } from 'mongoose';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private readonly carModel: Model<Car>) {}
  async create(createCarDto: CreateCarDto): Promise<Car> {
    const createdCar = new this.carModel(createCarDto);
    return createdCar.save();
  }

  async findAll(): Promise<Car[]> {
    return this.carModel.find();
  }

  async findOne(id: string): Promise<Car> {
    const car = await this.carModel.findById(id);
    if (!car) {
      throw new NotFoundException(`Car #${id} not found`);
    }
    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    const updatedCar = await this.carModel.findByIdAndUpdate(id, updateCarDto, { new: true });
    if (!updatedCar) {
      throw new NotFoundException(`Car #${id} not found`);
    }
    return updatedCar;
  }

  async remove(id: string): Promise<Car> {
    const car = await this.carModel.findByIdAndDelete(id);
    if (!car) {
      throw new NotFoundException(`Car #${id} not found`);
    }
    return car;
  }
}
