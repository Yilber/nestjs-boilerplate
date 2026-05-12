import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, UpdateResult } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Role } from '../../../../domain/role';
import { RoleRepository } from '../../role.repository';
import { RoleMapper } from '../mappers/role.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class RoleRelationalRepository implements RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async create(data: Role): Promise<Role> {
    const persistenceModel = RoleMapper.toPersistence(data);

    const newEntity = await this.roleRepository.save(
      this.roleRepository.create(persistenceModel),
    );

    return RoleMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Role[]> {
    const entities = await this.roleRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => RoleMapper.toDomain(entity));
  }

  async findByName(name: Role['name']): Promise<NullableType<Role>> {
    const entity = await this.roleRepository.findOne({
      where: { name: String(name) },
    });

    return entity ? RoleMapper.toDomain(entity) : null;
  }

  async findByRefId(refId: Role['refId']): Promise<NullableType<Role>> {
    const entity = await this.roleRepository.findOne({
      where: { refId: String(refId) },
    });

    return entity ? RoleMapper.toDomain(entity) : null;
  }

  async findById(id: Role['id']): Promise<NullableType<Role>> {
    const entity = await this.roleRepository.findOne({
      where: { id: Number(id) },
    });

    return entity ? RoleMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Role['id'][]): Promise<Role[]> {
    const entities = await this.roleRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => RoleMapper.toDomain(entity));
  }

  async update(
    id: Role['id'],
    payload: Partial<Role>,
  ): Promise<Role | UpdateResult> {
    const entity = await this.roleRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new NotFoundException(
        'Record not found',
        `Role with ID ${id} does not exist.`,
      );
    }

    const updatedEntity = await this.roleRepository.save(
      this.roleRepository.create(
        RoleMapper.toPersistence({
          ...RoleMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RoleMapper.toDomain(updatedEntity);
  }

  remove(id: Role['id']): Promise<UpdateResult> {
    return this.roleRepository.softDelete(id);
  }
}
