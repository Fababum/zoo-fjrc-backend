import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateArtikelDto {
  @IsString()
  @IsOptional()
  markdownText?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
