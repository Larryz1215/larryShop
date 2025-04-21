import { prisma } from '@/server/lib/prisma';

export default defineEventHandler(async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      success: true,
      users
    };
  } catch (error) {
    console.error('Fetch users failed:', error);
    return {
      success: false,
      message: '無法取得使用者資料'
    };
  }
});
