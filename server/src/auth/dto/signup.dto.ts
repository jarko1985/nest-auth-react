import {IsNotEmpty,IsString,IsEmail, MinLength, Matches, matches} from 'class-validator';


export class SignUpDto{
    @IsNotEmpty()
    @IsString()
    readonly name :string

    @IsNotEmpty()
    @IsEmail()
    readonly email :string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches(/(?=.*?[#?!@$%^&*-])/,{message:'password must have at least one special Charachter'})
    @Matches(/(?=.*[A-Za-z])/,{message:'password must have at least one letter'})
    @Matches(/.*[0-9].*/,{message:"password must have at least one Number"})
    readonly password :string
}