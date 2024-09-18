import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateSuggestionDto, UpdateSuggestionDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Suggestion } from '../models';
import { Model } from 'mongoose';

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectModel(Suggestion.name)
    private readonly sugestionModel: Model<Suggestion>,
  ) {}
  async create(
    @Req() req,
    { description, name, phone }: CreateSuggestionDto,
  ): Promise<Suggestion> {
    const user = req.user.id;

    const createdSugestion = new this.sugestionModel({
      description,
      name,
      phone,
      userId: user,
    });
    return createdSugestion.save();
  }

  async findAll(): Promise<Suggestion[]> {
    return this.sugestionModel.find();
  }

  async findOne(id: string): Promise<Suggestion> {
    const sugesstion = await this.sugestionModel.findById(id);
    if (!sugesstion) {
      throw new NotFoundException(`Sugesstion #${id} not found`);
    }
    return sugesstion;
  }

  async update(
    id: string,
    updateSugestionDto: UpdateSuggestionDto,
  ): Promise<Suggestion> {
    const updatedSuestion = await this.sugestionModel.findByIdAndUpdate(
      id,
      updateSugestionDto,
      { new: true },
    );
    if (!updatedSuestion) {
      throw new NotFoundException(`Sugesstion #${id} not found`);
    }
    return updatedSuestion;
  }

  async remove(id: string): Promise<Suggestion> {
    const sugesstion = await this.sugestionModel.findByIdAndDelete(id);
    if (!sugesstion) {
      throw new NotFoundException(`Sugesstion #${id} not found`);
    }
    return sugesstion;
  }
}
