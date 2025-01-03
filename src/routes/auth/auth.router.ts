import {AuthController} from './auth.controller';
import {Router} from 'express';
import {inject} from 'inversify';
import {provide} from '@lib/utils/ioc/injectable-decorator';

@provide()
export class AuthRouter {
  private readonly _router: Router = Router({mergeParams: true});

  @inject(AuthController) private readonly _authController: AuthController;

  public publicRoutes() {
    this._router.post('/signup', this._authController.signup);

    return this._router;
  }
}
