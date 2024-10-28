import { Prisma } from "@prisma/client";

export type SubbeditWithFlair = Prisma.SubbeditGetPayload<{
  include: { Flair: true };
}>;
