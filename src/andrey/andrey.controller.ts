import { Controller, Get, Param } from '@nestjs/common';
import { AndreyService } from './andrey.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Andrey')
@Controller('andrey')
export class AndreyController {
  constructor(private andreyService: AndreyService) {}

  @ApiOperation({ summary: 'Hello for Andrey' })
  @ApiResponse({ status: 200, type: String })
  @Get('/')
  hello() {
    return this.andreyService.hello();
  }

  @ApiOperation({ summary: 'Example by ID' })
  @Get('/:id')
  answerById(@Param() { id }: { id: string }) {
    return `You sent me: ${id}`;
  }
}
