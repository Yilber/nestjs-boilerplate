---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.controller.ts
---
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
import { <%= h.inflection.transform(name, ['pluralize']) %>Service } from './<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service';
import { Create<%= name %>Dto } from './dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
import { Update<%= name %>Dto } from './dto/update-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { <%= name %> } from './domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';
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
import { FindAll<%= h.inflection.transform(name, ['pluralize']) %>Dto } from './dto/find-all-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.dto';
import { UpdateResult } from 'typeorm';

@ApiTags('<%= h.inflection.transform(name, ['pluralize', 'humanize']) %>')
@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: '<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>',
  version: '1',
})
export class <%= h.inflection.transform(name, ['pluralize']) %>Controller {
  constructor(private readonly <%= h.inflection.camelize(h.inflection.pluralize(name), true) %>Service: <%= h.inflection.transform(name, ['pluralize']) %>Service) {}

  @Post()
  @ApiCreatedResponse({
    type: <%= name %>,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.CREATED)
  create<%= name %>(@Request() request: any, @Body() create<%= name %>Dto: Create<%= name %>Dto) {
    create<%= name %>Dto.createdById = Number(request.user.id);

    return this.<%= h.inflection.camelize(h.inflection.pluralize(name), true) %>Service.create(create<%= name %>Dto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(<%= name %>),
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.OK)
  async getAll<%= h.inflection.transform(name, ['pluralize']) %>(
    @Query() query: FindAll<%= h.inflection.transform(name, ['pluralize']) %>Dto,
  ): Promise<InfinityPaginationResponseDto<<%= name %>>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.<%= h.inflection.camelize(h.inflection.pluralize(name), true) %>Service.findAllWithPagination({
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
    type: <%= name %>,
  })
  @ApiNotFoundResponse({
    description: '<%= name %> with the provided name does not exist.',
  })   
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  get<%= name %>ByName(@Param('name') name: <%= name %>['name']): Promise<NullableType<<%= name %>>>{
    return this.<%= h.inflection.camelize(h.inflection.pluralize(name), true) %>Service.findByName(name);
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
    type: <%= name %>,
  })
  @ApiNotFoundResponse({
    description: '<%= name %> with the provided refId does not exist.',
  })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  get<%= name %>ByRefId(@Param('refId') refId: <%= name %>['refId']): Promise<NullableType<<%= name %>>>{
    return this.<%= h.inflection.camelize(h.inflection.pluralize(name), true) %>Service.findByRefId(refId);
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
    type: <%= name %>,
  })
  @ApiNotFoundResponse({
    description: '<%= name %> with the provided ID does not exist.',
  })   
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  get<%= name %>ById(@Param('id') id: <%= name %>['id']) : Promise<NullableType<<%= name %>>> {
    return this.<%= h.inflection.camelize(h.inflection.pluralize(name), true) %>Service.findById(id);
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
    type: <%= name %>,
  })
    @ApiNotFoundResponse({
    description: '<%= name %> with the provided ID does not exist.',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @HttpCode(HttpStatus.NOT_FOUND)
  update<%= name %>(
    @Request() request: any,
    @Param('id') id: <%= name %>['id'],
    @Body() update<%= name %>Dto: Update<%= name %>Dto,
   ): Promise<<%= name %> | UpdateResult> {
    update<%= name %>Dto.updatedById = Number(request.user.id);
    
    return this.<%= h.inflection.camelize(h.inflection.pluralize(name), true) %>Service.update(id, update<%= name %>Dto);
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
    type: <%= name %>,
  })
  @ApiNotFoundResponse({
    description: '<%= name %> with the provided ID does not exist.',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @HttpCode(HttpStatus.NOT_FOUND)
  remove<%= name %>(
    @Request() request: any,
    @Param('id') id: <%= name %>['id']    
   ): Promise<<%= name %> | UpdateResult> {
    const deletedById = Number(request.user.id);
    
    return this.<%= h.inflection.camelize(h.inflection.pluralize(name), true) %>Service.update(id, {
      deletedById,
      deletedAt: new Date(),
    });
  }
}
