import {provide} from '@lib/utils/ioc/injectable-decorator';
import {UserRepository} from '@modules/user/user.repository';
import {UserService} from '@modules/user/user.service';
import {inject} from 'inversify';

@provide()
export class AuthService {
  @inject(UserService) private readonly _userService: UserService;
  @inject(UserRepository) private readonly _userRepository: UserRepository;
}
