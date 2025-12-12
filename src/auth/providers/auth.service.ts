import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public login(email: string, password: string) {
    const user = this.usersService.findOneByEmail(email);
    if (user && user.password === password) {
      return {
        message: 'Login successful',
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      };
    } else {
      return { message: 'Invalid email or password' };
    }
  }
}
