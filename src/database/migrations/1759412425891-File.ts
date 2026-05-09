import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getColumns } from '../baseColumns';

export class File1759412425891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'files',
        columns: getColumns([
          {
            name: 'path',
            type: 'varchar',
            isNullable: false,
          },
        ]),
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('files');
  }
}
