/* eslint-disable prettier/prettier */
import { Controller,Post,Body,BadRequestException} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    @Post('register')
    async register(
        @Body('email') email:string,
        @Body('password') password:string
    ){
            if(!email)
            {
                throw new BadRequestException("Email is Required for Registration");
            }
            if(!password)
            {
                throw new BadRequestException("Password is Required for Registration");
            }
            try{
                const user =await this.usersService.register(email,password);
                return {message:"Registration Successfully!!",user};
            }
            catch(error)
            {
                throw new BadRequestException(error.message);
            }
        }
    @Post('login')
    async login(
        @Body('email') email:string,
        @Body('password') password:string
    ){
        if(!email)
        {
            throw new BadRequestException("Email is Required for Registration");
        }
        if(!password)
        {
            throw new BadRequestException("Password is Required for Registration");
        }
        try
        {
            const token=await this.usersService.login(email,password);
            return {message:"LogIn Successfully!!",token};
        }
        catch(error)
        {
            throw new BadRequestException(error.message);
        }
    }
}
