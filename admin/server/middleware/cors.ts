export default defineEventHandler((event) => {
  setHeader(event, 'Access-Control-Allow-Origin', '*') // 或限制為 http://localhost:5173
  setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // 處理預檢請求
  if (getMethod(event) === 'OPTIONS') {
    return new Response(null, { status: 204 })
  }
})