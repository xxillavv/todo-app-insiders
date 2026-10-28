import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minLowercase: 0,
    minNumbers: 0,
  })
  @MaxLength(72)
  password!: string;
}

export class LoginUserDto {
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  password!: string;
}