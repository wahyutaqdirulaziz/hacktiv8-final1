/*
 Navicat Premium Data Transfer

 Source Server         : final
 Source Server Type    : PostgreSQL
 Source Server Version : 130004
 Source Host           : ec2-44-198-196-169.compute-1.amazonaws.com:5432
 Source Catalog        : d4gv30e94moi5s
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 130004
 File Encoding         : 65001

 Date: 07/11/2021 18:13:33
*/


-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 32767
START 1
CACHE 1;

-- ----------------------------
-- Table structure for reflections
-- ----------------------------
DROP TABLE IF EXISTS "public"."reflections";
CREATE TABLE "public"."reflections" (
  "id" uuid NOT NULL,
  "success" varchar(255) COLLATE "pg_catalog"."default",
  "low_point" varchar(255) COLLATE "pg_catalog"."default",
  "take_away" varchar(255) COLLATE "pg_catalog"."default",
  "owner_id" varchar(500) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6)
)
;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int2 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) DEFAULT NULL::timestamp without time zone,
  "updated_at" timestamp(6),
  "deleted_at" timestamp(6)
)
;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 3, true);

-- ----------------------------
-- Primary Key structure for table reflections
-- ----------------------------
ALTER TABLE "public"."reflections" ADD CONSTRAINT "reflections_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
