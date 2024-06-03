/* eslint-disable prettier/prettier */
import { Controller,Post,Body,BadRequestException, Res,Get, Req,Header} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response,Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    @Post('register')
    @Header('Access-Control-Allow-Origin', '*')
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
                return {message:"Registration Successful!!",user};
            }
            catch(error)
            {
                throw new BadRequestException(error.message);
            }
        }
    @Post('login')
    async login(
        @Body('email') email:string,
        @Body('password') password:string,
        @Res({passthrough:true}) response:Response
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
            response.cookie('token', token, { httpOnly: true });
            return {message:"LogIn Successfully!!",token};
        }
        catch(error)
        {
            throw new BadRequestException(error.message);
        }
    }

    @Get('authenticate')
    async authenticate(@Req() request: Request) {
        try
        {
            const cookieToken = request.cookies['token'];
            if (cookieToken) {
                const isValidToken = this.usersService.validateToken(cookieToken);
                if (isValidToken) {
                    return { message: "User is Authenticated" };
                }
            }
            return { message: "User Not authenticated" };
        }
        catch(error)
        {
            throw new BadRequestException(error.message);
        }
    }

    @Post('logout')
    async logout(@Req() request: Request, @Res() response: Response) {
        try {
            response.clearCookie('token');
            return {
                message: "Logout Successfully!!"
            };
        } catch (error) {
            throw new Error("Error occurred during logout");
        }
    }
}
