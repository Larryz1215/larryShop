import { prisma } from '~/server/lib/prisma';

export default defineEventHandler(async () => {
  try {
    const count = await prisma.product.count();
    return { success: true, count };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
});
