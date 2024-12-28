import {provide} from '@lib/utils/ioc/injectable-decorator';
import {AuthService} from '@modules/auth/auth.service';
import {Request, Response} from 'express';
import {inject} from 'inversify';

@provide()
export class AuthController {
  @inject(AuthService) private readonly _authService: AuthService;

  public async signup(req: Request, res: Response) {
    return res.status(200).send({message: 'OK'});
  }
}