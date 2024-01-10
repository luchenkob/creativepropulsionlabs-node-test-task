import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * create a user
   * @param payload
   */
  async create(payload: CreateUserDto) {
    await this.throwIFEmailExist(payload.email);
    return await this.prisma.user.create({
      data: payload,
    });
  }

  /**
   * check if email already exist
   * @param email
   */
  async throwIFEmailExist(email: string) {
    const isEmailExist = await this.prisma.user.findFirst({
      where: { email },
    });

    if (isEmailExist) {
      throw new BadRequestException('Email already exist');
    }
  }

  /**
   * get all users
   */
  async findAll() {
    return await this.prisma.user.findMany();
  }

  /**
   * get a user by id
   * @param id
   */
  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * update a user by id
   * @param id
   * @param payload
   */
  async update(id: number, payload: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (user && user.id !== id) {
      throw new BadRequestException('Email already exist');
    }
    return await this.prisma.user.update({
      where: { id },
      data: payload,
    });
  }

  /**
   * delete a user by id
   * @param id
   */
  async delete(id: number) {
    const user = await this.prisma.user
      .delete({
        where: { id },
      })
      .catch(() => {
        throw new BadRequestException('Failed to delete user');
      });

    if (user.id === id) {
      return 'User deleted successfully';
    }

    return 'User not found';
  }
}
