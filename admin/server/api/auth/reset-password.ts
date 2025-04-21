import jwt from 'jsonwebtoken';
import { prisma } from '@/server/lib/prisma';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { token, newPassword } = body;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashed }
    });

    return { success: true, message: '密碼已成功更新' };
  } catch (error) {
    return { success: false, message: '無效或過期的 token' };
  }
});
