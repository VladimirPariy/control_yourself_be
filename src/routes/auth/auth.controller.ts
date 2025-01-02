import type {Request, Response} from 'express';
import {AuthService} from '@modules/auth/auth.service';
import {inject} from 'inversify';
import {provide} from '@lib/utils/ioc/injectable-decorator';
import {signupSchema} from './auth.validation';

@provide()
export class AuthController {
  @inject(AuthService) private readonly _authService: AuthService;

  constructor() {
    this.signup = this.signup.bind(this);
  }

  public async signup(req: Request, res: Response) {
    const payload = await signupSchema.parseAsync(req.body);
    const user = await this._authService.registerUser(payload);
    res.send(user);
  }
}
