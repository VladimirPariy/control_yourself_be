import {Router} from 'express';
import {Container} from 'inversify';

export function rootRouter(_: Container): Router {
  const router = Router();

  return router;
}
