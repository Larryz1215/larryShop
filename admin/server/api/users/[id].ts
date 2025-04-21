// server/api/users/[id].ts
import { prisma } from '@/server/lib/prisma';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    return {
      success: false,
      message: '請提供使用者 ID'
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        orders: {
          include: {
            items: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return {
        success: false,
        message: '找不到該使用者'
      };
    }

    return {
      success: true,
      user
    };
  } catch (error) {
    console.error('Fetch user failed:', error);
    return {
      success: false,
      message: '無法取得使用者資料'
    };
  }
});
