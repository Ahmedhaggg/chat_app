import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateGroupMembers1693648902949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "groupMembers" (
                "id" serial PRIMARY KEY,
                "memberId" uuid REFERENCES  "users"("id"),
                "groupId" INT REFERENCES "groups"("id")
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "groupMembers"`);
    }

}
