import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  createPost(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createPost(createBoardDto);
  }

  @Get('/')
  getAllPosts(): Promise<Board[]> {
    return this.boardsService.getAllPosts();
  }

  @Get('/:id')
  getPostById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getPostById(id);
  }

  @Delete('/:id')
  deletePostById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deletePost(id);
  }

  @Patch('/:id/status')
  updatePostStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updatePostStatus(id, status);
  }
}
