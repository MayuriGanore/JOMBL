import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(email: string, password: string): Promise<{
        message: string;
        user: import("./schemas/user.schemas").User;
    }>;
    login(email: string, password: string): Promise<{
        message: string;
        token: string;
    }>;
}
