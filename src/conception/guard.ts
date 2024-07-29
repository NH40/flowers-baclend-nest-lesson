import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		console.log('guard....')
		const request = context.switchToHttp().getRequest()
		const isAuth = request.headers.authorization === 'secret'
		if (!isAuth) throw new UnauthorizedException('not authorization')

		return isAuth
	}
}
