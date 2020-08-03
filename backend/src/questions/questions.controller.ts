import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetQuestionsSuccessDto } from './question.dto';
import { QuestionsService } from './questions.service';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Get()
  getQuestions(): Promise<GetQuestionsSuccessDto> {
    return this.questionsService.getQuestions();
  }
}
