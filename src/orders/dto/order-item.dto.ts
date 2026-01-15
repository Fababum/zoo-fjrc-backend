import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class OrderItemDto {
  @IsString()
  title: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(1)
  qty: number;
}
