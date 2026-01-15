import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentMethodDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  cardType?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  last4?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  street?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  houseNumber?: string;

  @IsString()
  @IsOptional()
  addressExtra?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  postalCode?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  city?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  country?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  phone?: string;
}
