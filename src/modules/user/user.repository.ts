import {PrismaClient} from '@prisma/client';
import {inject} from 'inversify';
import {provide} from '@lib/utils/ioc/injectable-decorator';

@provide()
export class UserRepository {
  @inject(PrismaClient) private readonly _prisma: PrismaClient;

  public async getUserByEmail(email: string) {
    return this._prisma.user.findUnique({where: {email}});
  }
}
