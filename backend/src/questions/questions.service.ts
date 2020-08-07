import {Injectable} from '@nestjs/common';
import {QuestionModel} from '../mongoModels';
import {GetQuestionsSuccessDto} from './question.dto';

@Injectable()
export class QuestionsService {

    async getQuestions(): Promise<GetQuestionsSuccessDto> {
        const allQuestions = await QuestionModel.find();
        return {
            questions: allQuestions.map((q) => ({
                _id: q._id.toString(),
                title: q.title,
                content: q.content,
                solution: q.solution,
            }))
        }
    }
}
