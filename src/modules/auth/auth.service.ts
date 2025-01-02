import {HttpError} from '@lib/errors/http-error';
import type {SignupData} from '@app/routes/auth/auth.validation';
import {UserRepository} from '@modules/user/user.repository';
import {inject} from 'inversify';
import {provide} from '@lib/utils/ioc/injectable-decorator';

@provide()
export class AuthService {
  @inject(UserRepository) private readonly _userRepository: UserRepository;

  public async registerUser(signupData: SignupData) {
    const user = await this._userRepository.getUserByEmail(signupData.email);

    if (user) {
      throw new HttpError(409, 'User already exists');
    }

    return user;
  }
}
