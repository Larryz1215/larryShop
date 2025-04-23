import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/server/lib/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { adminName, password } = body;

  if (!adminName || !password) {
    return {
      success: false,
      message: '請填寫帳號與密碼'
    };
  }

  const admin = await prisma.admin.findUnique({ where: { adminName } });
  if (!admin) {
    return { success: false, message: '找不到管理員帳號' };
  }

  const isMatch = await compare(password, admin.password);
  if (!isMatch) {
    return { success: false, message: '密碼錯誤' };
  }

  const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET!, { expiresIn: '1d' });

  return {
    success: true,
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      adminName: admin.adminName,
      isSuper: admin.isSuper,
      isActive: admin.isActive
    }
  };
});
