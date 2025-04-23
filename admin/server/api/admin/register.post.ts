import { hash } from 'bcryptjs';
import { prisma } from '@/server/lib/prisma';

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    return sendError(event, createError({ statusCode: 405, statusMessage: '不支援的 HTTP 方法' }));
  }

  const body = await readBody(event);
  const { adminName, password, isSuper , isActive = true, email } = body;

  if (!adminName || !password) {
    return { success: false, message: '帳號與密碼為必填' };
  }

  try {
    const exist = await prisma.admin.findUnique({ where: { adminName } });
    if (exist) {
      return { success: false, message: '帳號已存在' };
    }

    const hashedPassword = await hash(password, 10);

    const newAdmin = await prisma.admin.create({
      data: {
        adminName,
        email,
        password: hashedPassword,
        isSuper,
        isActive
      }
    });

    return {
      success: true,
      admin: {
        id: newAdmin.id,
        adminName: newAdmin.adminName,
        isSuper: newAdmin.isSuper,
        isActive: newAdmin.isActive
      }
    };
  } catch (error) {
    console.error('新增管理員失敗:', error);
    return { success: false, message: '新增失敗' };
  }
});
