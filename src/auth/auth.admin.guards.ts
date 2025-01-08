import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthAdminGuard implements CanActivate {
    constructor (private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        const { authorization: token }: any = request.headers;

        if (!token || token.trim() === '') {
            throw new UnauthorizedException();
        }

        try {
            const tokenInfo = await this.authService.validateToken(token);
            if (!tokenInfo.profiles.includes('Admin')) {
                return false;
            }

            request.user = tokenInfo;
        }
        catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}