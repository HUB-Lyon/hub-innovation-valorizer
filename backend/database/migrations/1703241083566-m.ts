import { MigrationInterface, QueryRunner } from "typeorm";

export class M1703241083566 implements MigrationInterface {
    name = 'M1703241083566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "milestone" DROP CONSTRAINT "FK_edc28a2e0442554afe5eef2bdcb"`);
        await queryRunner.query(`ALTER TABLE "milestone" ADD CONSTRAINT "FK_edc28a2e0442554afe5eef2bdcb" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "milestone" DROP CONSTRAINT "FK_edc28a2e0442554afe5eef2bdcb"`);
        await queryRunner.query(`ALTER TABLE "milestone" ADD CONSTRAINT "FK_edc28a2e0442554afe5eef2bdcb" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
