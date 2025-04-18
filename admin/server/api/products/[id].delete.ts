import { prisma } from '~/server/lib/prisma';


export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id)
  return prisma.product.delete({ where: { id } })
})