import { prisma } from '~/server/lib/prisma';
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    console.log('📥 新增商品資料:', body);
    console.log('📦 DATABASE_URL:', process.env.DATABASE_URL);

    if (!body.name || typeof body.price !== 'number' || typeof body.stock !== 'number') {
      throw createError({ statusCode: 400, message: '請填寫完整欄位' });
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        stock: body.stock,
        description: body.description || ''
      }
    });

    return { success: true, product };
  } catch (error: any) {
    console.error('❌ 商品新增失敗:', error);
    return sendError(event, createError({ statusCode: 500, message: error.message }));
  }
});
