import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusRepository } from './infrastructure/persistence/status.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Status } from './domain/status';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class StatusesService {
  constructor(
    // Dependencies here
    private readonly statusRepository: StatusRepository,
  ) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    // Do not remove comment below.
    // <creating-property />

    return this.statusRepository.create({
      ...createStatusDto,
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Status[]> {
    return this.statusRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findByName(name: Status['name']): Promise<NullableType<Status>> {
    return this.statusRepository.findByName(name);
  }

  findByRefId(refId: Status['refId']): Promise<NullableType<Status>> {
    return this.statusRepository.findByRefId(refId);
  }

  findById(id: Status['id']): Promise<NullableType<Status>> {
    return this.statusRepository.findById(id);
  }

  findByIds(ids: Status['id'][]): Promise<Status[]> {
    return this.statusRepository.findByIds(ids);
  }

  async update(
    id: Status['id'],
    updateStatusDto: UpdateStatusDto,
  ): Promise<Status | any> {
    // Do not remove comment below.
    // <updating-property />

    return this.statusRepository.update(id, {
      ...updateStatusDto,
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  /*
  remove(id: Status['id']): Promise<any> {
    return this.statusRepository.remove(id);
  }
  */
}
