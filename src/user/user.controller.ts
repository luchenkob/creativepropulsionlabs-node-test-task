import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') uid: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(+uid, dto);
  }

  @Get(':id')
  async findOne(@Param('id') uid: string) {
    return this.userService.findOne(+uid);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') uid: string) {
    return this.userService.delete(+uid);
  }
}
