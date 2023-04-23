import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1682252141659 implements MigrationInterface {
  name = 'Migration1682252141659';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dish" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "image" character varying(64) NOT NULL, "caption" character varying(255) NOT NULL, "price" double precision NOT NULL, "rating" double precision NOT NULL, "delivery_time" smallint NOT NULL, "description" character varying(255) NOT NULL, "categoryId" uuid, CONSTRAINT "PK_59ac7b35af39b231276bfc4c00c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "promocode" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "discount" smallint NOT NULL, CONSTRAINT "PK_181c2c413dea9b3c725820e4dde" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "time" smallint NOT NULL, "deliveryTime" TIMESTAMP NOT NULL, "address" character varying(255) NOT NULL, "total_price" double precision NOT NULL, "promocodeId" uuid, "userId" uuid, "courierId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" smallint NOT NULL, "avatar" character varying(64), "user_name" character varying(40) NOT NULL, "email" character varying(40) NOT NULL, "phone_number" character varying(40), "address" character varying(255), "role" character varying NOT NULL, "password" character varying(72) NOT NULL, CONSTRAINT "UQ_758b8ce7c18b9d347461b30228d" UNIQUE ("user_id"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_favorite_dishes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "dishId" uuid, "userId" uuid, "categoryId" uuid, CONSTRAINT "PK_24ce7c7803bbaa352c85489f296" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "one_time_password" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "otp" character varying(6) NOT NULL, "userId" uuid, CONSTRAINT "UQ_baad3eb989ae49a5d39f93557f7" UNIQUE ("otp"), CONSTRAINT "REL_47e930d26650fc7fec23300be7" UNIQUE ("userId"), CONSTRAINT "PK_6aa80a21a6822be4a9d8b5c7d5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "dish" ADD CONSTRAINT "FK_f101936095917dde2a9f0609516" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_9ba5c03604e80ed82babd56e503" FOREIGN KEY ("promocodeId") REFERENCES "promocode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_09a8dc00d5ffead302306720bc1" FOREIGN KEY ("courierId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_dishes" ADD CONSTRAINT "FK_537941613fffc7170c5b1962743" FOREIGN KEY ("dishId") REFERENCES "dish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_dishes" ADD CONSTRAINT "FK_19f16c7012b173130b700d1c299" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_dishes" ADD CONSTRAINT "FK_627cfdfa163c0e862889824fcfe" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "one_time_password" ADD CONSTRAINT "FK_47e930d26650fc7fec23300be71" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "one_time_password" DROP CONSTRAINT "FK_47e930d26650fc7fec23300be71"`);
    await queryRunner.query(`ALTER TABLE "user_favorite_dishes" DROP CONSTRAINT "FK_627cfdfa163c0e862889824fcfe"`);
    await queryRunner.query(`ALTER TABLE "user_favorite_dishes" DROP CONSTRAINT "FK_19f16c7012b173130b700d1c299"`);
    await queryRunner.query(`ALTER TABLE "user_favorite_dishes" DROP CONSTRAINT "FK_537941613fffc7170c5b1962743"`);
    await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_09a8dc00d5ffead302306720bc1"`);
    await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
    await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_9ba5c03604e80ed82babd56e503"`);
    await queryRunner.query(`ALTER TABLE "dish" DROP CONSTRAINT "FK_f101936095917dde2a9f0609516"`);
    await queryRunner.query(`DROP TABLE "one_time_password"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "user_favorite_dishes"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "promocode"`);
    await queryRunner.query(`DROP TABLE "dish"`);
  }
}
