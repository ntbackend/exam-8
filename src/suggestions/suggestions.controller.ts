import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { CreateSuggestionDto, UpdateSuggestionDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Suggestions')
@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createSuggestionDto: CreateSuggestionDto,
  ) {
    return this.suggestionsService.create(req, createSuggestionDto);
  }

  @Get()
  findAll() {
    return this.suggestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suggestionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSuggestionDto: UpdateSuggestionDto,
  ) {
    return this.suggestionsService.update(id, updateSuggestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suggestionsService.remove(id);
  }
}
