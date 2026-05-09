import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UpdateResult } from 'typeorm';
import { RolesGuard } from '../roles/roles.guard';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { NullableType } from '../utils/types/nullable.type';
import { User } from './domain/user';
import { QueryUserDto } from './dto/query-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    type: User,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.CREATED)
  createUser(
    @Request() request: any,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    createUserDto.createdById = Number(request.user.id);

    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(User),
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.OK)
  async getAllUsers(
    @Query() query: QueryUserDto,
  ): Promise<InfinityPaginationResponseDto<User>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.usersService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('refId/:refId')
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiParam({
    name: 'refId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'User with the provided refId does not exist.',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  getUserByRefId(
    @Param('refId') refId: User['refId'],
  ): Promise<NullableType<User>> {
    return this.usersService.findByRefId(refId);
  }

  @Get(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiOkResponse({
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'User with the provided ID does not exist.',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  getUserById(@Param('id') id: User['id']): Promise<NullableType<User>> {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiOkResponse({
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'User with the provided ID does not exist.',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @HttpCode(HttpStatus.NOT_FOUND)
  updateUser(
    @Request() request: any,
    @Param('id') id: User['id'],
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | UpdateResult> {
    updateUserDto.updatedById = Number(request.user.id);

    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiOkResponse({
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'User with the provided ID does not exist.',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @HttpCode(HttpStatus.NOT_FOUND)
  removeUser(
    @Request() request: any,
    @Param('id') id: User['id'],
  ): Promise<User | UpdateResult> {
    const deletedById = Number(request.user.id);

    return this.usersService.update(id, {
      deletedById,
      deletedAt: new Date(),
    });
  }
}
