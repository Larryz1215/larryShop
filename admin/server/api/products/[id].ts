import { prisma } from '~/server/lib/prisma';

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0');
  const method = getMethod(event);

  if (method === 'GET') {
    const product = await prisma.product.findUnique({ where: { id } });
    return product;
  }

  if (method === 'PUT') {
    const body = await readBody(event);
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        price: body.price,
        stock: body.stock
      }
    });
    return { success: true, updated };
  }

  return { success: false, message: 'Unsupported method' };
});
