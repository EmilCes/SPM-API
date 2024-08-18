import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CoreService } from "src/core/core.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {

    constructor(
        private coreService: CoreService,
        private usersService: UsersService, 
        private jwtService: JwtService        
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);

        if(!(await this.coreService.comparePasswords(pass, user?.password))) 
            throw new UnauthorizedException();

        const payload = {
            username: user.username
        }

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }



}