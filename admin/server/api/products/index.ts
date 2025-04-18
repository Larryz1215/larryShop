import { prisma } from '~/server/lib/prisma';

export default defineEventHandler(async () => {
  // const product = await prisma.product.findMany({
  //   orderBy: { createdAt: 'desc' },
  // })
  // return product

  // 查詢所有商品
  const product = await prisma.product.findMany();
  console.log('Products fetched:', product); // 確認有資料返回
  return product;
});
