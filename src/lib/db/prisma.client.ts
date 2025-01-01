import {PrismaClient} from '@prisma/client';

export let prisma: PrismaClient;

export function initPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}
