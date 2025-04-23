import { prisma } from '~/server/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;


  if (!email || !password) {
    return sendError(event, createError({ statusCode: 400, message: '請輸入帳號與密碼' }));
  }

  // 找使用者
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return sendError(event, createError({ statusCode: 401, message: '使用者不存在' }));
  }

  // 比對密碼
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return sendError(event, createError({ statusCode: 401, message: '密碼錯誤' }));
  }

  // 產生 JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'mysecret', // 環境變數
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  };
});
