import { IsOptional, IsString, IsBoolean, IsIn } from 'class-validator';

export class UpdateArtikelDto {
  @IsString()
  @IsOptional()
  markdownText?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  @IsIn(['de', 'en', 'fr', 'it'])
  lang?: 'de' | 'en' | 'fr' | 'it';
}
