import { MigrationInterface, QueryRunner } from "typeorm"

export class M1703068394617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Make your query here
            
            await queryRunner.commitTransaction();
        } catch (err) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
