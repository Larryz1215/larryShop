import { prisma } from '@/server/lib/prisma';

export default defineEventHandler(async () => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      success: true,
      orders
    };
  } catch (error) {
    console.error('Fetch orders failed:', error);
    return {
      success: false,
      message: '無法取得訂單資料'
    };
  }
});
