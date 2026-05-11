import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { getColumns } from '../baseColumns';

export class User1759414610891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: getColumns([
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
            default: "'email'",
          },
          {
            name: 'socialId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'roleId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'statusId',
            type: 'int',
            isNullable: false,
          },
        ]),
        foreignKeys: [
          new TableForeignKey({
            referencedTableName: 'status',
            columnNames: ['statusId'],
            referencedColumnNames: ['id'],
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION',
          }),
          new TableForeignKey({
            referencedTableName: 'roles',
            columnNames: ['roleId'],
            referencedColumnNames: ['id'],
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION',
          }),
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'roleId');
    await queryRunner.dropForeignKey('users', 'statusId');

    await queryRunner.dropTable('users');
  }
}
