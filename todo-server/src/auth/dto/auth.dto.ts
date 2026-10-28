import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @MaxLength(254, { message: 'Email must be at most 254 characters long' })
  email!: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 1,
  }, { message: 'Password must be at least 6 characters long and contain at least one uppercase letter and one symbol' })
  @MaxLength(72, { message: 'Password must be at most 72 characters long' })
  password!: string;
}

export class LoginUserDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @MaxLength(254, { message: 'Email must be at most 254 characters long' })
  email!: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MaxLength(72, { message: 'Password must be at most 72 characters long' })
  password!: string;
}
