import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const { authorization: token }: any = request.headers;

        if (!token || token.trim() === '') {
            throw new UnauthorizedException();
        }

        try {
            const tokenInfo = await this.authService.validateToken(token);
            request.user = tokenInfo;
        }
        catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}