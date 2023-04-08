import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // ... you will write your Prisma Client queries here
  //   const user = await prisma.user.create({
  //     data: {
  //         name: 'Alice',
  //         email: 'alice@example.com'
  //     }
  //   })
  //   console.log(user)
  // const users = await prisma.user.findMany()
  // console.log(users)
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
