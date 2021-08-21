import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];  // private를 사용하면 다른 componenets에서 값을 수정하는 것을 막을 수 있음

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);

    return board;
  }

  getBoardById(id: string): Board {
    const result = this.boards.find((board) => board.id === id);

    if (!result) {
      throw new NotFoundException(`Can not find post with id ${id}`);
    }

    return result;
  }

  deleteBoard(id: string): void {
    const result = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== result.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;

    return board;
  }
}
