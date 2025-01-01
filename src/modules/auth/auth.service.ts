import {provide} from '@lib/utils/ioc/injectable-decorator';
import {UserRepository} from '@modules/user/user.repository';
import {UserService} from '@modules/user/user.service';
import {PrismaClient} from '@prisma/client';
import {inject} from 'inversify';
import {Redis} from 'ioredis';

@provide()
export class AuthService {
  @inject(UserService) private readonly _userService: UserService;
  @inject(UserRepository) private readonly _userRepository: UserRepository;
  @inject(Redis) private readonly _redis: Redis;
  @inject(PrismaClient) private readonly _prisma: PrismaClient;

  public async signup() {
    const user = await this._redis.get('user');
    const user1 = await this._prisma.user.findMany();
    console.log(user1, user);
    return user;
  }
}
