import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

faker.seed(123);

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 5; i++) {
    const subbedit = await prisma.subbedit.create({
      data: {
        name: faker.lorem.word(),
      },
    });

    const user = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
      },
    });

    for (let j = 0; j < 5; j++) {
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraphs(),
          userId: user.id,
          subbeditId: subbedit.id,
        },
      });

      for (let k = 0; k < 10; k++) {
        const comment = await prisma.comment.create({
          data: {
            body: faker.lorem.sentence(),
            userId: user.id,
            postId: post.id,
            parentCommentId: null,
          },
        });

        for (let l = 0; l < 2; l++) {
          const childComment = await prisma.comment.create({
            data: {
              body: faker.lorem.sentence(),
              userId: user.id,
              postId: post.id,
              parentCommentId: comment.id,
            },
          });

          for (let m = 0; m < 2; m++) {
            await prisma.comment.create({
              data: {
                body: faker.lorem.sentence(),
                userId: user.id,
                postId: post.id,
                parentCommentId: childComment.id,
              },
            });
          }
        }
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
