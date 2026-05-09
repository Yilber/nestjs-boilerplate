import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { getColumns } from '../baseColumns';

export class Session1759419405891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sessions',
        columns: getColumns([
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'hash',
            type: 'varchar',
            isNullable: false,
          },
        ]),
        foreignKeys: [
          new TableForeignKey({
            referencedTableName: 'users',
            columnNames: ['userId'],
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
    await queryRunner.dropForeignKey('sessions', 'userId');
    await queryRunner.dropTable('sessions');
  }
}
