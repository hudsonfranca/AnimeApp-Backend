import { MigrationInterface, QueryRunner } from 'typeorm';

export default class Initialize1591839513198 implements MigrationInterface {
    name = 'Initialize1591839513198';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "animes_to_my_list" ("id" SERIAL NOT NULL, "animeId" integer NOT NULL, "myListId" integer NOT NULL, "date" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ff82355fa579df4df967cafc90e" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "my_list" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_f4d7e1646bfa49f54bcfd673e1" UNIQUE ("userId"), CONSTRAINT "PK_50948b2442eaf0beff5f787ba99" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "episode_to_history" ("id" SERIAL NOT NULL, "episodeId" integer NOT NULL, "historyId" integer NOT NULL, "date" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3eed4a0a68a512ad1279783b38" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "history" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_7d339708f0fa8446e3c4128dea" UNIQUE ("userId"), CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "episodeId" integer, "userId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "episode" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "animeId" integer, "seasonId" integer, CONSTRAINT "PK_7258b95d6d2bf7f621845a0e143" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "season" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "animeId" integer, CONSTRAINT "PK_8ac0d081dbdb7ab02d166bcda9f" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "image" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "animeId" integer, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "anime" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "episode" integer NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying(2000) NOT NULL, "genreId" integer, CONSTRAINT "PK_6e567f73ed63fd388a7734cbdd3" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "animes_to_my_list" ADD CONSTRAINT "FK_63618147f25dff3735186b2736d" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "animes_to_my_list" ADD CONSTRAINT "FK_ad0e53a6f2af35d706202be715c" FOREIGN KEY ("myListId") REFERENCES "my_list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "my_list" ADD CONSTRAINT "FK_f4d7e1646bfa49f54bcfd673e10" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "episode_to_history" ADD CONSTRAINT "FK_4640c6c491462cf87eefc3ba496" FOREIGN KEY ("episodeId") REFERENCES "episode"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "episode_to_history" ADD CONSTRAINT "FK_0bbc423723a1dca782b6e9689d1" FOREIGN KEY ("historyId") REFERENCES "history"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "history" ADD CONSTRAINT "FK_7d339708f0fa8446e3c4128dea9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "comment" ADD CONSTRAINT "FK_5647592d2e1159953d7ad5d17bf" FOREIGN KEY ("episodeId") REFERENCES "episode"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "episode" ADD CONSTRAINT "FK_969247f869e17aeb3bcd3c548f6" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "episode" ADD CONSTRAINT "FK_e73d28c1e5e3c85125163f7c9cd" FOREIGN KEY ("seasonId") REFERENCES "season"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "season" ADD CONSTRAINT "FK_d5e55baa63ce35689f34c489e02" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "image" ADD CONSTRAINT "FK_9a5c8d229063b91ec3729e9aeb3" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "anime" ADD CONSTRAINT "FK_4005b720808c67451f7a6863acf" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "anime" DROP CONSTRAINT "FK_4005b720808c67451f7a6863acf"`,
        );
        await queryRunner.query(
            `ALTER TABLE "image" DROP CONSTRAINT "FK_9a5c8d229063b91ec3729e9aeb3"`,
        );
        await queryRunner.query(
            `ALTER TABLE "season" DROP CONSTRAINT "FK_d5e55baa63ce35689f34c489e02"`,
        );
        await queryRunner.query(
            `ALTER TABLE "episode" DROP CONSTRAINT "FK_e73d28c1e5e3c85125163f7c9cd"`,
        );
        await queryRunner.query(
            `ALTER TABLE "episode" DROP CONSTRAINT "FK_969247f869e17aeb3bcd3c548f6"`,
        );
        await queryRunner.query(
            `ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`,
        );
        await queryRunner.query(
            `ALTER TABLE "comment" DROP CONSTRAINT "FK_5647592d2e1159953d7ad5d17bf"`,
        );
        await queryRunner.query(
            `ALTER TABLE "history" DROP CONSTRAINT "FK_7d339708f0fa8446e3c4128dea9"`,
        );
        await queryRunner.query(
            `ALTER TABLE "episode_to_history" DROP CONSTRAINT "FK_0bbc423723a1dca782b6e9689d1"`,
        );
        await queryRunner.query(
            `ALTER TABLE "episode_to_history" DROP CONSTRAINT "FK_4640c6c491462cf87eefc3ba496"`,
        );
        await queryRunner.query(
            `ALTER TABLE "my_list" DROP CONSTRAINT "FK_f4d7e1646bfa49f54bcfd673e10"`,
        );
        await queryRunner.query(
            `ALTER TABLE "animes_to_my_list" DROP CONSTRAINT "FK_ad0e53a6f2af35d706202be715c"`,
        );
        await queryRunner.query(
            `ALTER TABLE "animes_to_my_list" DROP CONSTRAINT "FK_63618147f25dff3735186b2736d"`,
        );
        await queryRunner.query(`DROP TABLE "anime"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "season"`);
        await queryRunner.query(`DROP TABLE "episode"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "history"`);
        await queryRunner.query(`DROP TABLE "episode_to_history"`);
        await queryRunner.query(`DROP TABLE "my_list"`);
        await queryRunner.query(`DROP TABLE "animes_to_my_list"`);
        await queryRunner.query(`DROP TABLE "genre"`);
    }
}
