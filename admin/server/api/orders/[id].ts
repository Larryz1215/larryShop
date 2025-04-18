import { prisma } from '@/server/lib/prisma'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  })

  return order
})