import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  // Inject Repository to Service
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createPost(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createPost(createBoardDto);
  }

  async getAllPosts(): Promise<Board[]> {
    const result = await this.boardRepository.find();
    return result;
  }

  async getPostById(id: number): Promise<Board> {
    const result = await this.boardRepository.findOne(id);

    if (!result) {
      throw new NotFoundException(`Cannot find post with id ${id}`);
    }

    return result;
  }

  async deletePost(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Cannot delete post with id ${id}`);
    }
  }

  async updatePostStatus(id: number, status: BoardStatus): Promise<Board> {
    const post = await this.getPostById(id);

    post.status = status;
    await this.boardRepository.save(post);
    
    return post;
  }
}
