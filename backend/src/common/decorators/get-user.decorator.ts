import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserFromRequest } from "src/auth/interfaces/user-from-request.interface";

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): UserFromRequest => {
        const request = ctx.switchToHttp().getRequest();

        return { 
            id: request.user.id,
            role: request.user.role
        };
    }
);
