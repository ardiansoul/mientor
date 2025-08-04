import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1753969454787 implements MigrationInterface {
    name = 'Migration1753969454787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ADD "creatorId" uuid NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "creatorId"`);
    }

}
