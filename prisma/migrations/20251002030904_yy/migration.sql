/*
  Warnings:

  - You are about to drop the column `url` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `issuer` on the `Certification` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Certification` table. All the data in the column will be lost.
  - You are about to drop the column `conference` on the `Conference` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Conference` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Journal` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `event` on the `Talk` table. All the data in the column will be lost.
  - You are about to drop the column `slidesUrl` on the `Talk` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Talk` table. All the data in the column will be lost.
  - Added the required column `event` to the `Conference` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `Patent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "url",
ADD COLUMN     "course" TEXT,
ADD COLUMN     "link" TEXT;

-- AlterTable
ALTER TABLE "Certification" DROP COLUMN "issuer",
DROP COLUMN "title",
ADD COLUMN     "details" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "linkText" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "provider" TEXT,
ADD COLUMN     "year" TEXT;

-- AlterTable
ALTER TABLE "Conference" DROP COLUMN "conference",
DROP COLUMN "url",
ADD COLUMN     "details" TEXT,
ADD COLUMN     "event" TEXT NOT NULL,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'international';

-- AlterTable
ALTER TABLE "Journal" DROP COLUMN "url",
ADD COLUMN     "details" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'international';

-- AlterTable
ALTER TABLE "Patent" ADD COLUMN     "applicationNumber" TEXT,
ADD COLUMN     "publishedDate" TEXT,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'filed';

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "imageUrl",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "linkedinPost" TEXT,
ADD COLUMN     "shortDescription" TEXT,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "testimonial" TEXT,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "typeCompany" TEXT,
ADD COLUMN     "typeUrl" TEXT,
ADD COLUMN     "ytLink" TEXT;

-- AlterTable
ALTER TABLE "Talk" DROP COLUMN "event",
DROP COLUMN "slidesUrl",
DROP COLUMN "title",
ADD COLUMN     "college" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "topic" TEXT;

-- CreateTable
CREATE TABLE "BookChapter" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "chapterTitle" TEXT NOT NULL,
    "bookTitle" TEXT NOT NULL,
    "doi" TEXT,
    "doiLink" TEXT,
    "isbn" TEXT,
    "coAuthors" TEXT NOT NULL,
    "scopusLink" TEXT,
    "crossrefLink" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookChapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UltimateGoal" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UltimateGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalSummary" (
    "id" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionalSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectSkill" (
    "id" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectSkill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectSkill_skill_key" ON "ProjectSkill"("skill");
