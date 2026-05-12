import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './infrastructure/persistence/role.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Role } from './domain/role';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class RolesService {
  constructor(
    // Dependencies here
    private readonly roleRepository: RoleRepository,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    // Do not remove comment below.
    // <creating-property />

    return this.roleRepository.create({
      ...createRoleDto,
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Role[]> {
    return this.roleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findByName(name: Role['name']): Promise<NullableType<Role>> {
    return this.roleRepository.findByName(name);
  }

  findByRefId(refId: Role['refId']): Promise<NullableType<Role>> {
    return this.roleRepository.findByRefId(refId);
  }

  findById(id: Role['id']): Promise<NullableType<Role>> {
    return this.roleRepository.findById(id);
  }

  findByIds(ids: Role['id'][]): Promise<Role[]> {
    return this.roleRepository.findByIds(ids);
  }

  async update(
    id: Role['id'],
    updateRoleDto: UpdateRoleDto,
  ): Promise<Role | any> {
    // Do not remove comment below.
    // <updating-property />

    return this.roleRepository.update(id, {
      ...updateRoleDto,
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  /*
  remove(id: Role['id']): Promise<UpdateResult> {
    return this.roleRepository.remove(id);
  }
  */
}
