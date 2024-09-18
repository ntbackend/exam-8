import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';

@Injectable()
export class UploadService {
  private readonly client: S3Client;

  constructor(private readonly config: ConfigService) {
    this.client = new S3Client({
      endpoint: config.get('R2_ENDPOINT'),
      region: 'auto',
      credentials: {
        accessKeyId: config.get('R2_ACCESS_KEY'),
        secretAccessKey: config.get('R2_SECRET_KEY'),
      },
    });
  }

  async create(file: Express.Multer.File): Promise<string> {
    const fileName = `${randomUUID()}${extname(file.originalname)}`;
    const fileType = file.mimetype;
    const fileBuffer = file.buffer;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.config.get('R2_BUCKET'),
        Key: fileName,
        ContentType: fileType,
        Body: fileBuffer,
      }),
    );

    return fileName; 
  }
}
