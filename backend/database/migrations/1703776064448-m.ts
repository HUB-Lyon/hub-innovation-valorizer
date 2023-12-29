import { MigrationInterface, QueryRunner } from "typeorm";

export class M1703776064448 implements MigrationInterface {
    name = 'M1703776064448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "member" ("email" character varying NOT NULL, "role" character varying NOT NULL, "projectId" integer, CONSTRAINT "PK_4678079964ab375b2b31849456c" PRIMARY KEY ("email"))`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_1521f298c02c827852ebb2aef72" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_1521f298c02c827852ebb2aef72"`);
        await queryRunner.query(`DROP TABLE "member"`);
    }

}
