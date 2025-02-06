import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function createSubbedits(count: number) {
  return Promise.all(
    Array.from({ length: count }, () =>
      prisma.subbedit.create({
        data: { name: faker.lorem.word() },
      }),
    ),
  );
}

async function createUsers(count: number) {
  return Promise.all(
    Array.from({ length: count }, () =>
      prisma.user.create({
        data: {
          username: faker.internet.username(),
          email: faker.internet.email(),
        },
      }),
    ),
  );
}

async function createPosts(count: number, userId: number, subbeditId: number) {
  return Promise.all(
    Array.from({ length: count }, () =>
      prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraphs(),
          userId,
          subbeditId,
        },
      }),
    ),
  );
}

async function createComments(
  count: number,
  userId: number,
  postId: number,
  parentCommentId: number | null = null,
) {
  return Promise.all(
    Array.from({ length: count }, () =>
      prisma.comment.create({
        data: {
          body: faker.lorem.sentence(),
          userId,
          postId,
          parentCommentId,
        },
      }),
    ),
  );
}

async function main() {
  const subbedits = await createSubbedits(5);
  const users = await createUsers(5);

  for (const subbedit of subbedits) {
    for (const user of users) {
      await createPosts(5, user.id, subbedit.id);

      // for (const post of posts) {
      //   const comments = await createComments(10, user.id, post.id);

      //   for (const comment of comments) {
      //     const childComments = await createComments(
      //       2,
      //       user.id,
      //       post.id,
      //       comment.id,
      //     );

      //     for (const childComment of childComments) {
      //       await createComments(2, user.id, post.id, childComment.id);
      //     }
      //   }
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
