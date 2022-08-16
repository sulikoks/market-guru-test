import { Module } from '@nestjs/common';
import { AndreyController } from './andrey.controller';
import { AndreyService } from './andrey.service';

@Module({
  controllers: [AndreyController],
  providers: [AndreyService],
  imports: [],
  exports: [],
})
export class AndreyModule {}
