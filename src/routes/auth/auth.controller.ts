import {provide} from '@lib/utils/ioc/injectable-decorator';
import {AuthService} from '@modules/auth/auth.service';
import {Request, Response} from 'express';
import {inject} from 'inversify';

@provide()
export class AuthController {
  @inject(AuthService) private readonly _authService: AuthService;

  constructor() {
    this.signup = this.signup.bind(this);
  }

  public async signup(req: Request, res: Response) {
    const user = await this._authService.signup();
    res.send(user);
  }
}
