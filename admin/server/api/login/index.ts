import { prisma } from '~/server/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = body;

    if (!email || !password) {
      return sendError(event, createError({ statusCode: 400, message: '請輸入帳號與密碼' }));
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return sendError(event, createError({ statusCode: 401, message: '使用者不存在' }));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(event, createError({ statusCode: 401, message: '密碼錯誤' }));
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'mysecret', { expiresIn: '7d' });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  } catch (err) {
    console.error('[login error]', err); // 會顯示在 Vercel Logs
    return sendError(event, createError({ statusCode: 500, message: 'Server Error' }));
  }
});
