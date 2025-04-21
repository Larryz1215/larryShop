// server/api/test.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('✅ 測試收到的 body:', body);
  return { success: true, body };
});
