import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateGroupCategory1693314254507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group_Categories" (
            "id" serial NOT NULL,
            "name" character varying NOT NULL,
            CONSTRAINT "PK_5f9a6e4b2a35d5b099822ae94b7" PRIMARY KEY ("id")
          )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "group_Categories"`);
    }

}
