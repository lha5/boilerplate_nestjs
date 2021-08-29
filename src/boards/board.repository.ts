import { EntityRepository, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createPost(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const post = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(post);

    return post;
  }
}