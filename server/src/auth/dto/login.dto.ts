import {IsNotEmpty,IsString,IsEmail, MinLength} from 'class-validator';


export class LoginDto{

    @IsNotEmpty()
    @IsEmail()
    readonly email :string
    
    @IsNotEmpty()
    @IsString()
    readonly password :string
}