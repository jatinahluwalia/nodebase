import { PrismaPostgresAdapter } from "@prisma/adapter-ppg";
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = global as typeof global & {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPostgresAdapter({
      connectionString: process.env.DATABASE_URL,
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
