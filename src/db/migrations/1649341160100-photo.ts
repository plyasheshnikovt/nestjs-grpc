import { MigrationInterface, QueryRunner } from 'typeorm';

export class photo1649341160100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      await queryRunner.query(`
                CREATE TABLE photo
                  (
                    id              int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                    title           text NOT NULL,
                    link            text NOT NULL,
                    media           text NOT NULL,
                    description     text NOT NULL,
                    author          text NOT NULL,
                    "authorId"      text NOT NULL,
                    tags            text NOT NULL,
                    "dateTaken"     timestamp NOT NULL,
                    "published"     timestamp NOT NULL
                  )
      `);

      await queryRunner.query(`
                 CREATE UNIQUE INDEX photo_link_unique ON photo (link)
      `);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
