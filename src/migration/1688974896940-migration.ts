import { MigrationInterface, QueryRunner } from "typeorm";

const Books = `
CREATE TABLE [dbo].[BooksMapping](
	[createdAt] [datetime2](7) NOT NULL,
	[updatedAt] [datetime2](7) NOT NULL,
	[createdBy] [varchar](255) NOT NULL,
	[updatedBy] [varchar](255) NOT NULL,
	[id] [uniqueidentifier] default newid()
	[bookCode] [varchar](128) NOT NULL,
    [author] [varchar](128) NOT NULL,
    [isPublished] [bit] NULL,
    `;

export class Migration1688974896940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(Books);
    await queryRunner.query(
      `create unique clustered index "IDC_BooksMapping_eid" on "BooksMapping" (eid)`
    );
    await queryRunner.query(`
              CREATE UNIQUE NONCLUSTERED INDEX "IDX_id_not_null"
              ON "BooksMapping" (id)
              WHERE id IS NOT NULL;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `drop index "IDC_BooksMapping_eid" on "BooksMapping"`
    );
    await queryRunner.query(`drop index "IDX_id_not_null" on "BooksMapping"`);
  }
}
