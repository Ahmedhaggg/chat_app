import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1693214462254 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "username" character varying NOT NULL,
            "photo" character varying NOT NULL,
            "email" character varying NOT NULL,
            "groupsNumber" smallint NOT NULL DEFAULT '0',
            CONSTRAINT "UQ_6db74117f5a8f6e6f01f97c3e74" UNIQUE ("email"),
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("users")
    }

}
