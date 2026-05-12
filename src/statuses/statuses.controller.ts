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
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Status } from './domain/status';
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
import { FindAllStatusesDto } from './dto/find-all-statuses.dto';

@ApiTags('statuses')
@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'statuses',
  version: '1',
})
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Status,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.CREATED)
  createStatus(
    @Request() request: any,
    @Body() createStatusDto: CreateStatusDto,
  ) {
    createStatusDto.createdById = Number(request.user.id);

    return this.statusesService.create(createStatusDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Status),
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.OK)
  async getAllStatuses(
    @Query() query: FindAllStatusesDto,
  ): Promise<InfinityPaginationResponseDto<Status>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.statusesService.findAllWithPagination({
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
    type: Status,
  })
  @ApiNotFoundResponse({
    description: 'Status with the provided name does not exist.',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  getStatusByName(
    @Param('name') name: Status['name'],
  ): Promise<NullableType<Status>> {
    return this.statusesService.findByName(name);
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
    type: Status,
  })
  @ApiNotFoundResponse({
    description: 'Status with the provided refId does not exist.',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  getStatusByRefId(
    @Param('refId') refId: Status['refId'],
  ): Promise<NullableType<Status>> {
    return this.statusesService.findByRefId(refId);
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
    type: Status,
  })
  @ApiNotFoundResponse({
    description: 'Status with the provided ID does not exist.',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  getStatusById(@Param('id') id: Status['id']): Promise<NullableType<Status>> {
    return this.statusesService.findById(id);
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
    type: Status,
  })
  @ApiNotFoundResponse({
    description: 'Status with the provided ID does not exist.',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @HttpCode(HttpStatus.NOT_FOUND)
  updateStatus(
    @Request() request: any,
    @Param('id') id: Status['id'],
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<Status | any> {
    updateStatusDto.updatedById = Number(request.user.id);

    return this.statusesService.update(id, updateStatusDto);
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
    type: Status,
  })
  @ApiNotFoundResponse({
    description: 'Status with the provided ID does not exist.',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @HttpCode(HttpStatus.NOT_FOUND)
  removeStatus(
    @Request() request: any,
    @Param('id') id: Status['id'],
  ): Promise<Status | any> {
    const deletedById = Number(request.user.id);

    return this.statusesService.update(id, {
      deletedById,
      deletedAt: new Date(),
    });
  }
}
