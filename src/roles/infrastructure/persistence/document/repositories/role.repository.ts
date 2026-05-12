import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Role } from '../../../../domain/role';
import { RoleRepository } from '../../role.repository';
import { RoleSchemaClass } from '../entities/role.schema';
import { RoleMapper } from '../mappers/role.mapper';

@Injectable()
export class RoleDocumentRepository implements RoleRepository {
  constructor(
    @InjectModel(RoleSchemaClass.name)
    private readonly roleModel: Model<RoleSchemaClass>,
  ) {}

  async create(data: Role): Promise<Role> {
    const persistenceModel = RoleMapper.toPersistence(data);
    const createdEntity = new this.roleModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return RoleMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Role[]> {
    const entityObjects = await this.roleModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      RoleMapper.toDomain(entityObject),
    );
  }

  async findByName(name: Role['name']): Promise<NullableType<Role>> {
    const entityObject = await this.roleModel.findOne({ name });
    return entityObject ? RoleMapper.toDomain(entityObject) : null;
  }

  async findByRefId(refId: Role['refId']): Promise<NullableType<Role>> {
    const entityObject = await this.roleModel.findOne({ refId });
    return entityObject ? RoleMapper.toDomain(entityObject) : null;
  }

  async findById(id: Role['id']): Promise<NullableType<Role>> {
    const entityObject = await this.roleModel.findById(id);
    return entityObject ? RoleMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Role['id'][]): Promise<Role[]> {
    const entityObjects = await this.roleModel.find({
      _id: { $in: ids.map((id) => id.toString()) },
    });

    return entityObjects.map((entityObject) =>
      RoleMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Role['id'],
    payload: Partial<Role>,
  ): Promise<NullableType<Role>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.roleModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.roleModel.findOneAndUpdate(
      filter,
      RoleMapper.toPersistence({
        ...RoleMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? RoleMapper.toDomain(entityObject) : null;
  }

  remove(id: Role['id']): Promise<any> {
    return this.roleModel.deleteOne({ _id: id.toString() });
  }
}
