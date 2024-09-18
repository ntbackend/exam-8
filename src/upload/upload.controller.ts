import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Uploads')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
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
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 10, // Maksimal fayl hajmi 10MB
          }),
          new FileTypeValidator({
            fileType: '.(png|jpg|jpeg|svg|heic|gif|webp|pdf|mp4)',
          }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    const uploadedFiles = await Promise.all(
      files.map((file) => this.uploadService.create(file)),
    );

    return {
      message: 'Files successfully uploaded',
      files: uploadedFiles,
    };
  }
}
