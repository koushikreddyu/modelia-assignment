import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordHash: 'hashed_password_here',
      name: 'Test User',
    },
  });
}

main()
  .then(() => {
    console.log('✅ Database seeded');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
