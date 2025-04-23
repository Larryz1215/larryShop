# 🛒 MyShop 電商網站專案

這是一個全端電商網站專案，包含後台管理與前台購物體驗，支援商品管理、購物車、訂單建立與庫存管理等完整功能。

---

## 🔧 專案架構

MyShop/
├── frontend/ # 使用 Vite + Vue3 建構的購物網站前台
├── admin/ # 使用 Nuxt3 開發的後台管理系統
├── prisma/ # Prisma schema 與 migration 設定
├── generated/ # Prisma 生成的 client └── .env # 資料庫連線設定

---

## 🖥️ 前端（Frontend）

- **框架**：Vue 3 + Vite
- **狀態管理**：Pinia（含購物車狀態持久化）
- **路由**：Vue Router
- **樣式**：Tailwind CSS + Element Plus（UI 套件）
- **功能**：
  - 商品列表與詳細頁面
  - 加入購物車與移除功能
  - 結帳功能，含庫存數量驗證
  - 訂單送出後導向訂單詳情頁

---

## 🛠️ 後台（Admin）

- **框架**：Nuxt 3
- **UI 套件**：Element Plus + Tailwind CSS
- **資料存取**：透過 API 與 Prisma 操作 PostgreSQL 資料庫
- **功能模組**：
  - 商品管理（新增 / 編輯 / 刪除 / 庫存設定）
  - 訂單管理（查看訂單、訂單詳情）
  - 管理員登入 / 登出（可擴充）
  - 管理員管理 (新增、編輯)

---

## 🗄️ 資料庫

- **類型**：PostgreSQL（部署於 Render）
- **ORM**：Prisma ORM
- **Schema 架構**：
  - `Product`：商品資訊與庫存數量
  - `Order`：訂單總覽資料
  - `OrderItem`：訂單中的每一筆商品與數量明細
  - `User`: 會員
  - `Admin`: 管理員


---

## 🔌 API 設計

- **/api/products**：取得商品資訊
- **/api/products/[id]**：取得單一商品
- **/api/products/stock-check**：驗證商品庫存
- **/api/orders**：建立訂單並扣除庫存
- **/api/orders/[id]**：查詢訂單詳情
- **/api/admin**:管理員列表
- **/api/admin/[id]** :管理員詳情
- **/api/admin/login**:管理員登入
- **/api/admin/register**:創建管理員
- **/api/user/index**:會員列表
- **/api/user/[id]** :會員詳情
- **/api/user/register**:創建會員
- **/login**:會員登入


---

## 📦 使用套件清單

### 共用

- `prisma`：現代化 TypeScript ORM，對接 PostgreSQL、MySQL 等資料庫
- `@prisma/client`：Prisma 操作 client
- `postgresql`：資料庫
- `tailwindcss`：CSS 框架
- `element-plus`：UI 元件庫

### Frontend

- `vue@3`：JavaScript 前端框架
- `pinia`：狀態管理工具
- `vue-router`：前端路由管理
- `pinia-plugin-persistedstate`：Pinia 狀態持久化

### Admin

- `nuxt@3`：Vue 的 SSR 全端框架
- `@element-plus/nuxt`：Element Plus Nuxt 插件
- `@tailwindcss/nuxt`：Tailwind Nuxt 插件
- `resend` : Email API，用來發送註冊確認、重設密碼等通知
- `jsonwebtoken` : 用於產生與驗證 JWT token，支援登入、身份驗證流程
- `bcryptjs` : 密碼加密套件，用於安全儲存使用者密碼

### 1. 前端啟動

`cd frontend`
`pnpm install`
`pnpm run dev`

### 2. 後台（Admin）啟動

`cd admin`
`pnpm install`
`pnpm run dev`

### 3. 資料庫設定

#### 產生 Prisma Client

`npx prisma generate`

##### 若需要初始化資料表

`npx prisma migrate dev`

#### 若同步現有資料庫結構（保留資料）

`npx prisma db pull`

#### 強制重置資料庫（會清空所有資料）

`npx prisma db push --force-reset`


#### 如果有新的TABLE 要加入現有資料庫
`npx prisma generate`
`npx prisma db push`
