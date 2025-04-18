import { prisma } from '~/server/lib/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { items } = body;

  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.id }
    });

    if (!product || product.stock < item.qty) {
      return {
        success: false,
        message: `商品「${item.name}」庫存不足，剩餘 ${product?.stock ?? 0} 件`
      };
    }
  }

  return { success: true };
});
