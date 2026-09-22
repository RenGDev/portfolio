-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "image_url" TEXT,
ALTER COLUMN "link" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "git_hub_link" DROP NOT NULL,
ALTER COLUMN "linkedin_link" DROP NOT NULL;
