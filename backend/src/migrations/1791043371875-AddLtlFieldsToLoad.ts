import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLtlFieldsToLoad1791043371875 implements MigrationInterface {
    name = 'AddLtlFieldsToLoad1791043371875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."load_transporttype_enum" AS ENUM('FTL', 'LTL')`);
        await queryRunner.query(`ALTER TABLE "load" ADD "transportType" "public"."load_transporttype_enum" NOT NULL DEFAULT 'FTL'`);
        await queryRunner.query(`ALTER TABLE "load" ADD "required_space_ldm" numeric(5,2) NOT NULL DEFAULT '13.6'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "load" DROP COLUMN "required_space_ldm"`);
        await queryRunner.query(`ALTER TABLE "load" DROP COLUMN "transportType"`);
        await queryRunner.query(`DROP TYPE "public"."load_transporttype_enum"`);
    }

}
