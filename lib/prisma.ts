import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple instances in dev
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query", "warn", "error", "info"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
