import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { isEmpty } from 'class-validator';
import { AuthProvidersEnum } from '../auth/auth-providers.enum';
import { RoleEnum } from '../roles/roles.enum';
import { StatusEnum } from '../statuses/statuses.enum';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { User } from './domain/user';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './infrastructure/persistence/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Do not remove comment below.
    // <creating-property />

    if (!isEmpty(createUserDto.password)) {
      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    }

    if (!isEmpty(createUserDto.email)) {
      const userObject = await this.usersRepository.findByEmail(
        createUserDto.email,
      );

      if (userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.NOT_ACCEPTABLE,
          errors: {
            email: 'emailAlreadyExists',
          },
        });
      }
    }

    if (!isEmpty(createUserDto.roleId)) {
      const roleObject = Object.values(RoleEnum)
        .map(String)
        .includes(String(createUserDto.roleId));

      if (!roleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.NOT_FOUND,
          errors: {
            role: 'roleNotExists',
          },
        });
      }
    }

    if (!isEmpty(createUserDto.statusId)) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(createUserDto.statusId));

      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.NOT_FOUND,
          errors: {
            status: 'statusNotExists',
          },
        });
      }
    }

    return this.usersRepository.create({
      ...createUserDto,
      // Do not remove comment below.
      // <creating-property-payload />
      provider: createUserDto.provider ?? AuthProvidersEnum.email,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    return this.usersRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findByRefId(refId: User['refId']): Promise<NullableType<User>> {
    return this.usersRepository.findByRefId(refId);
  }

  findById(id: User['id']): Promise<NullableType<User>> {
    return this.usersRepository.findById(id);
  }

  findByIds(ids: User['id'][]): Promise<User[]> {
    return this.usersRepository.findByIds(ids);
  }

  findByEmail(email: User['email']): Promise<NullableType<User>> {
    return this.usersRepository.findByEmail(email);
  }

  findBySocialIdAndProvider({
    socialId,
    provider,
  }: {
    socialId: User['socialId'];
    provider: User['provider'];
  }): Promise<NullableType<User>> {
    return this.usersRepository.findBySocialIdAndProvider({
      socialId,
      provider,
    });
  }

  async update(
    id: User['id'],
    updateUserDto: UpdateUserDto,
  ): Promise<User | any> {
    // Do not remove comment below.
    // <updating-property />

    if (updateUserDto.password) {
      const userObject = await this.usersRepository.findById(id);

      if (userObject && userObject?.password !== updateUserDto.password) {
        const salt = await bcrypt.genSalt();
        updateUserDto.password = await bcrypt.hash(
          updateUserDto.password,
          salt,
        );
      }
    }

    if (updateUserDto.email) {
      const userObject = await this.usersRepository.findByEmail(
        updateUserDto.email,
      );

      if (userObject && userObject.id !== id) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailAlreadyExists',
          },
        });
      }
    }

    if (updateUserDto.roleId) {
      const roleObject = Object.values(RoleEnum)
        .map(String)
        .includes(String(updateUserDto.roleId));

      if (!roleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role: 'roleNotExists',
          },
        });
      }
    }

    if (updateUserDto.statusId) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(updateUserDto.statusId));

      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }
    }

    return this.usersRepository.update(id, {
      ...updateUserDto,
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: User['id']): Promise<any> {
    return this.usersRepository.remove(id);
  }
}
