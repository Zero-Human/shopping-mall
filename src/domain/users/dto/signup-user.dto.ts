import { IsEmail, IsMobilePhone, IsString, Matches } from 'class-validator';

export class SignUpUserDto {
  @IsEmail()
  email: string;
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[@$!%*#?&]).{8,20}$/, {
    message: '비밀번호는 숫자 영문 특수문자 1개씩 포함된 8~20자리입니다.',
  })
  @IsString()
  password: string;
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[@$!%*#?&]).{8,20}$/, {
    message: '비밀번호는 숫자 영문 특수문자 1개씩 포함된 8~20자리입니다.',
  })
  @IsString()
  passwordConfirm: string;
  @IsString()
  userName: string;
  @IsMobilePhone()
  phone: string;
}
