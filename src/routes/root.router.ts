import {Router} from 'express';
import {AuthRouter} from './auth/auth.router';
import {inject} from 'inversify';
import {provide} from '@lib/utils/ioc/injectable-decorator';

@provide()
export class RootRouter {
  private readonly _router = Router();

  @inject(AuthRouter) private readonly _authRouter: AuthRouter

  public execute() {
    this._router.use('/auth', this._authRouter.publicRoutes());
    return this._router;
  }
}
