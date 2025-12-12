import { Injectable } from '@nestjs/common';
import { GetUsersParamsDto } from '../dtos/get.users.params.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersDto } from '../dtos/create-users.dto';

/**
 * Service handling user-related business logic.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUsersDto) {
    //check if user exist
    const user = await this.userRepository.find({
      where: { email: createUserDto.email },
    });

    if (user.length > 0) {
      return 'User already exists';
    }
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  /**
   * Retrieve a list of users based on query parameters.
   *
   * @param {GetUsersParamsDto} getUserParamDto - Filters and search parameters for user retrieval.
   * @param {number} limit - Maximum number of users to return.
   * @param {number} offset - Number of users to skip for pagination.
   * @returns {Array<{ firstName: string; lastName: string }>} List of users.
   */
  public findAll(
    getUserParamDto: GetUsersParamsDto,
    limit: number,
    offset: number,
  ) {
    const users = this.userRepository.find({
      take: limit,
      skip: offset,
    });
    return users;
  }

  /**
   * Retrieve a user by their unique ID.
   *
   * @param {number} id - The unique identifier of the user.
   * @returns {{ id: number; firstName: string; lastName: string }} The matching user object.
   */
  public findOneById(id: number) {
    return {
      id: id,
      firstName: 'Hour',
      lastName: 'Dev',
    };
  }

  /**
   * Retrieve a user by their email address.
   *
   * @param {string} email - The email of the user to search for.
   * @returns {{ id: number; firstName: string; lastName: string; email: string; password: string }}
   * The user object matching the provided email.
   */
  public findOneByEmail(email: string) {
    return {
      id: 1,
      firstName: 'Hour',
      lastName: 'Dev',
      email: email,
      password: 'securepassword',
    };
  }
}
