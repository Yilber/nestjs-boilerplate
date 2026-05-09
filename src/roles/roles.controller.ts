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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from './domain/role';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../utils/types/nullable.type';
import { RolesGuard } from '../roles/roles.guard';
import { RoleEnum } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllRolesDto } from './dto/find-all-roles.dto';
import { UpdateResult } from 'typeorm';

@ApiTags('Roles')
@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'roles',
  version: '1',
})
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Role,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.CREATED)
  createRole(@Request() request: any, @Body() createRoleDto: CreateRoleDto) {
    createRoleDto.createdById = Number(request.user.id);

    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Role),
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.OK)
  async getAllRoles(
    @Query() query: FindAllRolesDto,
  ): Promise<InfinityPaginationResponseDto<Role>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.rolesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('name/:name')
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiParam({
    name: 'name',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Role,
  })
  @ApiNotFoundResponse({
    description: 'Role with the provided name does not exist.',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  getRoleByName(
    @Param('name') name: Role['name'],
  ): Promise<NullableType<Role>> {
    return this.rolesService.findByName(name);
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
    type: Role,
  })
  @ApiNotFoundResponse({
    description: 'Role with the provided refId does not exist.',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  getRoleByRefId(
    @Param('refId') refId: Role['refId'],
  ): Promise<NullableType<Role>> {
    return this.rolesService.findByRefId(refId);
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
    type: Role,
  })
  @ApiNotFoundResponse({
    description: 'Role with the provided ID does not exist.',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  getRoleById(@Param('id') id: Role['id']): Promise<NullableType<Role>> {
    return this.rolesService.findById(id);
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
    type: Role,
  })
  @ApiNotFoundResponse({
    description: 'Role with the provided ID does not exist.',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @HttpCode(HttpStatus.NOT_FOUND)
  updateRole(
    @Request() request: any,
    @Param('id') id: Role['id'],
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role | UpdateResult> {
    updateRoleDto.updatedById = Number(request.user.id);

    return this.rolesService.update(id, updateRoleDto);
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
    type: Role,
  })
  @ApiNotFoundResponse({
    description: 'Role with the provided ID does not exist.',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @HttpCode(HttpStatus.NOT_FOUND)
  removeRole(
    @Request() request: any,
    @Param('id') id: Role['id'],
  ): Promise<Role | UpdateResult> {
    const deletedById = Number(request.user.id);

    return this.rolesService.update(id, {
      deletedById,
      deletedAt: new Date(),
    });
  }
}
