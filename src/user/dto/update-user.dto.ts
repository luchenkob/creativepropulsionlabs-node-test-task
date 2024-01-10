import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  @MaxLength(255)
  email: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
