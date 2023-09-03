import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateGroup1693314261513 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "groups_privacy_enum" AS ENUM('public', 'private')`);
        await queryRunner.query(`CREATE TYPE "groups_status_enum" AS ENUM('opened', 'closed')`);
        await queryRunner.query(`CREATE TABLE "groups" (
            "id" serial NOT NULL,
            "name" character varying NOT NULL,
            "image" text NOT NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "code" character varying NOT NULL,
            "privacy" "groups_privacy_enum" NOT NULL,
            "status" "groups_status_enum" NOT NULL,
            "categoryId" integer,
            "adminId" uuid,
            CONSTRAINT "PK_4a132b8e95c9905f2f8779e5f83" PRIMARY KEY ("id"),
            CONSTRAINT "FK_9f8f23d1cda4bfb96cfc9720651" FOREIGN KEY ("categoryId") REFERENCES "group_Categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
            CONSTRAINT "FK_68f0e7a587b48b6a147dfaf7ad8" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION
        )`);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TYPE "groups_privacy_enum"`);
        await queryRunner.query(`DROP TYPE "groups_status_enum"`);
    }

}

