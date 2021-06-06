import { Module } from '@nestjs/common';
import { SupportService } from './support.service';
import { SupportController } from './support.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportRepository } from './support.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([SupportRepository])
  ],
  providers: [SupportService],
  controllers: [SupportController]
})
export class SupportModule {}
