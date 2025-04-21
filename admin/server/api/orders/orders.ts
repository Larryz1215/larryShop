import { prisma } from '@/server/lib/prisma';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    return sendError(event, createError({ statusCode: 405, statusMessage: '不支援的 HTTP 方法' }));
  }

  const body = await readBody(event);
  const { items, total, userId } = body;
  console.log('Request body:', body);
  console.log('Ready to create order with userId:', userId);

  if (!items || !Array.isArray(items) || items.length === 0) {
    return { success: false, message: '無效的訂單資料' };
  }
  if (!userId) {
    return { success: false, message: '缺少使用者 ID' };
  }
  try {
    // 1. 先確認所有商品庫存足夠
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id }
      });

      if (!product) {
        return { success: false, message: `找不到商品：${item.id}` };
      }

      if (product.stock < item.qty) {
        return { success: false, message: `「${product.name}」庫存不足，剩餘 ${product.stock} 件` };
      }
    }
    // 2. 建立訂單
    const order = await prisma.order.create({
      data: {
        total: total,
        items: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: item.qty,
            price: item.price
          }))
        },
        userId: userId
      }
    });
    console.log('Order created:', order);
    // 3. 扣除庫存
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.id },
        data: {
          stock: {
            decrement: item.qty
          }
        }
      });
    }

    return {
      success: true,
      orderId: order.id
    };
  } catch (error) {
    console.error('Create order failed:', error);
    return sendError(event, createError({ statusCode: 500, statusMessage: '訂單創建失敗' }));
  }
});
