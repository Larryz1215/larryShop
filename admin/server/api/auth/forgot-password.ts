import { Resend } from 'resend';
import jwt from 'jsonwebtoken';
import { prisma } from '@/server/lib/prisma';
import { H3Event } from 'h3';

const resend = new Resend(process.env.RESEND_API_KEY!);

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const { email } = body;
  console.log('email', email);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { success: false, message: '找不到該使用者' };
  }

  // 建立 30 分鐘有效的重設密碼 token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '30m'
  });

  const resetLink = `http://localhost:5173/reset-password?token=${token}`;

  await resend.emails.send({
    from: 'no-reply@resend.dev',
    to: email,
    subject: '重設您的密碼',
    html: `<p>請點擊以下連結來重設密碼：</p><a href="${resetLink}">${resetLink}</a>`
  });

  return { success: true, message: '重設密碼連結已寄出' };
});
