import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1681075953868 implements MigrationInterface {
  name = 'Migration1681075953868';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "promocode" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "discount" smallint NOT NULL, CONSTRAINT "PK_181c2c413dea9b3c725820e4dde" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" smallint NOT NULL, "avatar" character varying(64), "user_name" character varying(40) NOT NULL, "email" character varying(40) NOT NULL, "phone_number" character varying(40), "address" character varying(255), "role" json NOT NULL, "password" character varying(72) NOT NULL, CONSTRAINT "UQ_758b8ce7c18b9d347461b30228d" UNIQUE ("user_id"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "promocodeId" uuid, "userId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_dishes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "count" smallint NOT NULL, "dishId" uuid, "orderId" uuid, CONSTRAINT "PK_ce8d77187e309a6295943aa0a1a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "dish" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "image" character varying(64) NOT NULL, "caption" character varying(255) NOT NULL, "price" double precision NOT NULL, "rating" double precision NOT NULL, "delivery_time" smallint NOT NULL, "description" character varying(255) NOT NULL, "categoryId" uuid, CONSTRAINT "PK_59ac7b35af39b231276bfc4c00c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "one_time_password" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "otp" character varying(6) NOT NULL, "userId" uuid, CONSTRAINT "UQ_baad3eb989ae49a5d39f93557f7" UNIQUE ("otp"), CONSTRAINT "REL_47e930d26650fc7fec23300be7" UNIQUE ("userId"), CONSTRAINT "PK_6aa80a21a6822be4a9d8b5c7d5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_favorite_dish" ("userId" uuid NOT NULL, "dishId" uuid NOT NULL, CONSTRAINT "PK_563e21b361f2641edf1bb26dd09" PRIMARY KEY ("userId", "dishId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_408fd46183d49ef79ad85bdce7" ON "user_favorite_dish" ("userId") `);
    await queryRunner.query(`CREATE INDEX "IDX_0292a5c6072816859f042779ee" ON "user_favorite_dish" ("dishId") `);
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_9ba5c03604e80ed82babd56e503" FOREIGN KEY ("promocodeId") REFERENCES "promocode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_dishes" ADD CONSTRAINT "FK_3886c8e5aa68a2e5d6b1d1ed233" FOREIGN KEY ("dishId") REFERENCES "dish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_dishes" ADD CONSTRAINT "FK_874d4c6a3e239ed569650cc5132" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "dish" ADD CONSTRAINT "FK_f101936095917dde2a9f0609516" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "one_time_password" ADD CONSTRAINT "FK_47e930d26650fc7fec23300be71" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_dish" ADD CONSTRAINT "FK_408fd46183d49ef79ad85bdce75" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_dish" ADD CONSTRAINT "FK_0292a5c6072816859f042779eec" FOREIGN KEY ("dishId") REFERENCES "dish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_favorite_dish" DROP CONSTRAINT "FK_0292a5c6072816859f042779eec"`);
    await queryRunner.query(`ALTER TABLE "user_favorite_dish" DROP CONSTRAINT "FK_408fd46183d49ef79ad85bdce75"`);
    await queryRunner.query(`ALTER TABLE "one_time_password" DROP CONSTRAINT "FK_47e930d26650fc7fec23300be71"`);
    await queryRunner.query(`ALTER TABLE "dish" DROP CONSTRAINT "FK_f101936095917dde2a9f0609516"`);
    await queryRunner.query(`ALTER TABLE "order_dishes" DROP CONSTRAINT "FK_874d4c6a3e239ed569650cc5132"`);
    await queryRunner.query(`ALTER TABLE "order_dishes" DROP CONSTRAINT "FK_3886c8e5aa68a2e5d6b1d1ed233"`);
    await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
    await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_9ba5c03604e80ed82babd56e503"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_0292a5c6072816859f042779ee"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_408fd46183d49ef79ad85bdce7"`);
    await queryRunner.query(`DROP TABLE "user_favorite_dish"`);
    await queryRunner.query(`DROP TABLE "one_time_password"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "dish"`);
    await queryRunner.query(`DROP TABLE "order_dishes"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "promocode"`);
  }
}
