import { prisma } from '~/server/lib/prisma';

export default defineEventHandler(async () => {
  
  // 查詢所有商品
  const product = await prisma.product.findMany();
  return product;
});
