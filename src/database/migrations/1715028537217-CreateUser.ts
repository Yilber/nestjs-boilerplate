import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1715028537217 implements MigrationInterface {
  name = 'CreateUser1715028537217';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "roles" (
        "id" SERIAL NOT NULL,
        "refId" character varying(36) NOT NULL,
        "name" character varying NOT NULL,
        "description" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "createdById" integer NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedById" integer NOT NULL,
        "deletedAt" TIMESTAMP,
        "deletedById" integer,
        CONSTRAINT "UQ_dcb3aa4fdc529581ee22f38c9ee" UNIQUE ("refId"),
        CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
      )`);

    await queryRunner.query(
      `CREATE TABLE "status" (
        "id" SERIAL NOT NULL,
        "refId" character varying(36) NOT NULL,
        "name" character varying NOT NULL,
        "description" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "createdById" integer NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedById" integer NOT NULL,
        "deletedAt" TIMESTAMP,
        "deletedById" integer,
        CONSTRAINT "UQ_90df686be0e402f663e49a35d69" UNIQUE ("refId"),
        CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "files" (
        "id" SERIAL NOT NULL,
        "refId" character varying(36) NOT NULL,
        "path" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "createdById" integer NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedById" integer NOT NULL,
        "deletedAt" TIMESTAMP,
        "deletedById" integer,
        CONSTRAINT "UQ_f22a79373663e041d724a5a15c8" UNIQUE ("refId"),
        CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" SERIAL NOT NULL,
        "refId" character varying(36) NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying,
        "provider" character varying NOT NULL DEFAULT 'email',
        "socialId" character varying,             
        "roleId" integer NOT NULL,
        "statusId" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "createdById" integer NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedById" integer NOT NULL,
        "deletedAt" TIMESTAMP,
        "deletedById" integer,
        CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
        CONSTRAINT "UQ_bb3f79687322b82f4b7c5ba17b7" UNIQUE ("refId"),
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "users" ("socialId")`,
    );

    await queryRunner.query(
      `CREATE TABLE "sessions" (
        "id" SERIAL NOT NULL,
        "refId" character varying(36) NOT NULL,
        "hash" character varying NOT NULL,
        "userId" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "createdById" integer NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedById" integer NOT NULL,
        "deletedAt" TIMESTAMP,
        "deletedById" integer,
        CONSTRAINT "UQ_fd2c07268196b0dc954a8f0630b" UNIQUE ("refId"),
        CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "sessions" ("userId")`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );

    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );

    await queryRunner.query(`DROP TABLE "sessions"`);

    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );

    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
