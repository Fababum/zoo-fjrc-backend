import { IsNotEmpty, IsString, IsInt, IsOptional, IsIn } from 'class-validator';

export class CreateArtikelDto {
  @IsString()
  @IsNotEmpty()
  markdownText: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsOptional()
  @IsIn(['de', 'en', 'fr', 'it'])
  lang?: 'de' | 'en' | 'fr' | 'it';
}
