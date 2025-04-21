import { prisma } from '~/server/lib/prisma';
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return { success: false, message: '資料不完整' };
  }

  // 檢查 email 是否已註冊
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, message: 'Email 已註冊' };
  }

  // 加密密碼
  const hashedPassword = await bcrypt.hash(password, 10);

  // 建立使用者
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  return {
    success: true,
    message: '註冊成功',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
});
