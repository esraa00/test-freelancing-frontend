import { PrismaClient } from "@prisma/client";
import * as env from "env-var";
const NODE_ENV = env.get("NODE_ENV").required().asString();

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ["query"], errorFormat: "minimal" });

if (NODE_ENV !== "production") globalForPrisma.prisma = prisma;
