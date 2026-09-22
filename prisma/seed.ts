import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const senha = 'troque_essa_senha_123';
  const hash = bcrypt.hashSync(senha, 12);

  const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            first_name: 'Lorenzo',
            last_name: 'Gonçalves',
            username: 'admin',
            password: hash,
            email: 'lorenzodequadrosgoncalves@gmail.com',
            git_hub_link: 'https://github.com/RenGDev',
            linkedin_link: 'https://linkedin.com/in/lorenzo-gonçalves',
            is_admin: true,
    },
  });

  console.log('Admin user created:', admin.username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });