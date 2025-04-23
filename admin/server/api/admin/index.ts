import { prisma } from '@/server/lib/prisma';

export default defineEventHandler(async () => {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        adminName: true,
        email: true,
        createdAt: true,
        isActive: true,
        isSuper: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      success: true,
      admins
    };
  } catch (error) {
    console.error('Fetch users failed:', error);
    return {
      success: false,
      message: '無法取得使用者資料'
    };
  }
});
