import { prisma } from '@/server/lib/prisma';

export default defineEventHandler(async (event) => {
  const id = Number(event?.context?.params?.id);
  const body = await readBody(event);

  try {
    const updated = await prisma.admin.update({
      where: { id },
      data: {
        isSuper: body.isSuper,
        isActive: body.isActive
      }
    });
    return { success: true, admin: updated };
  } catch (error) {
    console.error('Update admin failed:', error);
    return { success: false, message: '更新失敗' };
  }
});
