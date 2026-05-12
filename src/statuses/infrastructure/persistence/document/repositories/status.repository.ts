import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusSchemaClass } from '../entities/status.schema';
import { StatusRepository } from '../../status.repository';
import { Status } from '../../../../domain/status';
import { StatusMapper } from '../mappers/status.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class StatusDocumentRepository implements StatusRepository {
  constructor(
    @InjectModel(StatusSchemaClass.name)
    private readonly statusModel: Model<StatusSchemaClass>,
  ) {}

  async create(data: Status): Promise<Status> {
    const persistenceModel = StatusMapper.toPersistence(data);
    const createdEntity = new this.statusModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return StatusMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Status[]> {
    const entityObjects = await this.statusModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      StatusMapper.toDomain(entityObject),
    );
  }

  async findByName(name: Status['name']): Promise<NullableType<Status>> {
    const entityObject = await this.statusModel.findOne({ name });
    return entityObject ? StatusMapper.toDomain(entityObject) : null;
  }

  async findByRefId(refId: Status['refId']): Promise<NullableType<Status>> {
    const entityObject = await this.statusModel.findOne({ refId });
    return entityObject ? StatusMapper.toDomain(entityObject) : null;
  }

  async findById(id: Status['id']): Promise<NullableType<Status>> {
    const entityObject = await this.statusModel.findById(id);
    return entityObject ? StatusMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Status['id'][]): Promise<Status[]> {
    const entityObjects = await this.statusModel.find({
      _id: { $in: ids.map((id) => id.toString()) },
    });
    return entityObjects.map((entityObject) =>
      StatusMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Status['id'],
    payload: Partial<Status>,
  ): Promise<NullableType<Status>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.statusModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.statusModel.findOneAndUpdate(
      filter,
      StatusMapper.toPersistence({
        ...StatusMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? StatusMapper.toDomain(entityObject) : null;
  }

  async remove(id: Status['id']): Promise<void> {
    await this.statusModel.deleteOne({ _id: id.toString() });
  }
}
