<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">👤 管理員列表</h2>

    <ClientOnly>
      <div class="mb-4 flex justify-end">
        <el-button type="primary" @click="openAddDialog" v-if="currentAdmin?.isSuper"
          ><el-icon :size="20" class="mr-1"><Plus /></el-icon> 新增管理員</el-button
        >
      </div>

      <el-table :data="admins" v-loading="loading" :default-sort="{ prop: 'id' }" style="width: 100%" border>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="adminName" label="adminName" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="isSuper" label="最高權限">
          <template #default="{ row }">
            <el-tag type="success" v-if="row.isSuper">是</el-tag>
            <el-tag type="info" v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isActive" label="啟用狀態">
          <template #default="{ row }">
            <el-switch v-model="row.isActive" @change="() => toggleActive(row)" :disabled="!currentAdmin?.isSuper || row.id == 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button size="small" @click="editAdmin(row)" :disabled="!currentAdmin?.isSuper || row.id == 1"> 編輯 </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 編輯 Dialog -->
      <el-dialog v-model="dialogVisible" title="編輯管理員" width="30%">
        <el-form :model="editForm" label-width="100px">
          <el-form-item label="帳號">
            <el-input v-model="editForm.adminName" placeholder="輸入帳號" />
          </el-form-item>
          <el-form-item label="信箱">
            <el-input v-model="editForm.email" placeholder="輸入信箱" type="email" />
          </el-form-item>
          <el-form-item label="最高權限">
            <el-switch v-model="editForm.isSuper" active-text="是" inactive-text="否" />
          </el-form-item>
          <el-form-item label="啟用帳號">
            <el-switch v-model="editForm.isActive" active-text="啟用" inactive-text="停用" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateAdmin">儲存</el-button>
        </template>
      </el-dialog>

      <!-- 新增 Dialog -->
      <el-dialog v-model="addDialogVisible" title="新增管理員" width="40%">
        <el-form :model="addForm" label-width="100px">
          <el-form-item label="帳號">
            <el-input v-model="addForm.adminName" placeholder="輸入帳號" />
          </el-form-item>
          <el-form-item label="密碼">
            <el-input v-model="addForm.password" placeholder="輸入密碼" type="password" show-password />
          </el-form-item>
          <el-form-item label="信箱">
            <el-input v-model="addForm.email" placeholder="輸入信箱" type="email" />
          </el-form-item>
          <el-form-item label="最高權限">
            <el-switch v-model="addForm.isSuper" active-text="是" inactive-text="否" />
          </el-form-item>
          <el-form-item label="啟用帳號">
            <el-switch v-model="addForm.isActive" active-text="啟用" inactive-text="停用" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="createAdmin">新增</el-button>
        </template>
      </el-dialog>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '../../store/auth';

definePageMeta({
  layout: 'admin'
});

const authStore = useAuthStore();
const currentAdmin = authStore.admin;

const admins = ref([]);
const loading = ref(false);

const dialogVisible = ref(false);
const addDialogVisible = ref(false);

const editForm = ref({ adminName: '', id: null, email: '', isSuper: false, isActive: false });
const addForm = ref({ adminName: '', email: '', password: '', isSuper: false, isActive: true });

const fetchAdmins = async () => {
  loading.value = true;
  const res = await fetch('/api/admin');
  const data = await res.json();
  admins.value = data.admins;
  loading.value = false;
};

const editAdmin = (admin) => {
  editForm.value = { ...admin };
  dialogVisible.value = true;
};


/** 更新管理員資料 */
const updateAdmin = async () => {
  const res = await fetch(`/api/admin/${editForm.value.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editForm.value)
  });
  const result = await res.json();
  if (result.success) {
    ElMessage.success('更新成功');
    dialogVisible.value = false;
    fetchAdmins();
  } else {
    ElMessage.error('更新失敗');
  }
};

/** 更新管理員啟用狀態 */

const toggleActive = async (admin) => {
  const res = await fetch(`/api/admin/${admin.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive: admin.isActive })
  });
  const result = await res.json();
  if (!result.success) {
    ElMessage.error('狀態更新失敗');
    fetchAdmins();
  }
  ElMessage.success('更新成功');
};

const openAddDialog = () => {
  addForm.value = { adminName:'', email: '', password: '', isSuper: false, isActive: true };
  addDialogVisible.value = true;
};


/** 新增管理員 */
const createAdmin = async () => {
  const res = await fetch('/api/admin/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(addForm.value)
  });
  const result = await res.json();
  if (result.success) {
    ElMessage.success('新增成功');
    addDialogVisible.value = false;
    fetchAdmins();
  } else {
    ElMessage.error(result.message || '新增失敗');
  }
};

onMounted(fetchAdmins);
</script>
