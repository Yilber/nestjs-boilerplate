import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getColumns } from '../baseColumns';

export class Role1759404328891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // for postgres
    // await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: getColumns([
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
        ]),
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
  }
}
