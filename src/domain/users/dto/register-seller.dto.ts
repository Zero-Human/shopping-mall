import { IsMobilePhone, IsString } from 'class-validator';

export class RegisterSellerDto {
  @IsMobilePhone()
  phone: string;
  @IsString()
  sellerName: string;
  @IsString()
  bank: string;
  @IsString()
  account: string;
  @IsString()
  accountHolder: string;
}
