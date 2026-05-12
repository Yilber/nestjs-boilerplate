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
  Request,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { NullableType } from '../utils/types/nullable.type';
import { Session } from './domain/session';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionService } from './session.service';

@ApiTags('Sessions')
@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'sessions',
  version: '1',
})
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @ApiCreatedResponse({
    type: Session,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.CREATED)
  createSession(
    @Request() request: any,
    @Body() createSessionDto: CreateSessionDto,
  ) {
    createSessionDto.createdById = Number(request.user.id);

    return this.sessionService.create(createSessionDto);
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
    type: Session,
  })
  @HttpCode(HttpStatus.OK)
  getSessionById(
    @Param('id') id: Session['id'],
  ): Promise<NullableType<Session>> {
    return this.sessionService.findById(id);
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
    type: Session,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  updateSession(
    @Request() request: any,
    @Param('id') id: Session['id'],
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<Session | any> {
    updateSessionDto.updatedById = Number(request.user.id);

    return this.sessionService.update(id, updateSessionDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeSession(@Param('id') id: Session['id']): Promise<any> {
    return this.sessionService.remove(id);
  }
}
