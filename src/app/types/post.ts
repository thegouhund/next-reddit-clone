import { Prisma } from "@prisma/client";

export type PostWithUserAndSubbedit = Prisma.PostGetPayload<{
  include: { User: true; Subbedit: true };
}>;
