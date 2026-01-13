import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateArtikelDto {
  @IsString()
  @IsNotEmpty()
  markdownText: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
