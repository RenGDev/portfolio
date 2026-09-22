-- AlterTable
ALTER TABLE "Techs" ADD COLUMN     "image_url" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about_me" TEXT;

-- CreateTable
CREATE TABLE "UserTechs" (
    "user_id" INTEGER NOT NULL,
    "techs_id" INTEGER NOT NULL,

    CONSTRAINT "UserTechs_pkey" PRIMARY KEY ("user_id","techs_id")
);

-- AddForeignKey
ALTER TABLE "UserTechs" ADD CONSTRAINT "UserTechs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTechs" ADD CONSTRAINT "UserTechs_techs_id_fkey" FOREIGN KEY ("techs_id") REFERENCES "Techs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
