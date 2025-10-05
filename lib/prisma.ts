import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple instances in dev
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn", "info"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
