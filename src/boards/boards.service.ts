import { Injectable } from '@nestjs/common';
import { Board } from './boards.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];  // private를 사용하면 다른 componenets에서 값을 수정하는 것을 막을 수 있음

  getAllBoards(): Board[] {
    return this.boards;
  }
}
