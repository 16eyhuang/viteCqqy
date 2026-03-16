<template>
  <!-- 成功提示弹窗 -->
  <van-dialog
    v-model:show="showSuccessDialog"
    :showConfirmButton="false"
    :showCancelButton="false"
    closeOnClickOverlay
    width="80vw"
    class="message-dialog success-dialog"
  >
    <div class="dialog-content">
      <!-- 关闭按钮 -->
      <div class="close-icon" @click="closeSuccess">
        <img v-if="closeIcon" :src="closeIcon" alt="关闭" />
        <span v-else class="close-text">×</span>
      </div>

      <!-- 图标区域 -->
      <div class="icon-area">
        <div v-if="successIcon" class="icon-image">
          <img :src="successIcon" alt="成功" />
        </div>
        <div v-else class="icon-symbol success-icon">✓</div>
      </div>

      <!-- 标题 -->
      <div v-if="title" class="title">{{ title }}</div>

      <!-- 消息内容 -->
      <div class="message">{{ message }}</div>

      <!-- 操作按钮 -->
      <div class="actions">
        <button v-if="showCancel" class="btn cancel-btn" @click="handleCancel">
          {{ cancelText }}
        </button>
        <button class="btn confirm-btn" @click="handleConfirm">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </van-dialog>

  <!-- 失败提示弹窗 -->
  <van-dialog
    v-model:show="showErrorDialog"
    :showConfirmButton="false"
    :showCancelButton="false"
    closeOnClickOverlay
    width="80vw"
    class="message-dialog error-dialog"
  >
    <div class="dialog-content">
      <!-- 关闭按钮 -->
      <div class="close-icon" @click="closeError">
        <img v-if="closeIcon" :src="closeIcon" alt="关闭" />
        <span v-else class="close-text">×</span>
      </div>

      <!-- 图标区域 -->
      <div class="icon-area">
        <div v-if="errorIcon" class="icon-image">
          <img :src="errorIcon" alt="失败" />
        </div>
        <div v-else class="icon-symbol error-icon">✕</div>
      </div>

      <!-- 标题 -->
      <div v-if="errorTitle" class="title">{{ errorTitle }}</div>

      <!-- 消息内容 -->
      <div class="message">{{ errorMessage }}</div>

      <!-- 操作按钮 -->
      <div class="actions">
        <button
          v-if="errorShowCancel"
          class="btn cancel-btn"
          @click="handleErrorCancel"
        >
          {{ errorCancelText }}
        </button>
        <button class="btn confirm-btn" @click="handleErrorConfirm">
          {{ errorConfirmText }}
        </button>
      </div>
    </div>
  </van-dialog>

  <!-- 确认弹窗 -->
  <van-dialog
    v-model:show="showConfirmDialog"
    :showConfirmButton="false"
    :showCancelButton="false"
    closeOnClickOverlay
    width="80vw"
    class="message-dialog confirm-dialog"
  >
    <div class="dialog-content">
      <!-- 关闭按钮 -->
      <div class="close-icon" @click="closeConfirm">
        <img v-if="closeIcon" :src="closeIcon" alt="关闭" />
        <span v-else class="close-text">×</span>
      </div>

      <!-- 图标区域 -->
      <div class="icon-area">
        <div v-if="confirmIcon" class="icon-image">
          <img :src="confirmIcon" alt="确认" />
        </div>
        <div v-else class="icon-symbol confirm-icon">?</div>
      </div>

      <!-- 标题 -->
      <div v-if="confirmTitle" class="title">{{ confirmTitle }}</div>

      <!-- 消息内容 -->
      <div class="message">{{ confirmMessage }}</div>

      <!-- 操作按钮 -->
      <div class="actions">
        <button class="btn cancel-btn" @click="handleConfirmCancel">
          {{ confirmCancelText }}
        </button>
        <button class="btn confirm-btn" @click="handleConfirmConfirm">
          {{ confirmConfirmText }}
        </button>
      </div>
    </div>
  </van-dialog>
</template>

<script setup>
import { ref, reactive, computed, defineExpose } from "vue";

// 成功弹窗数据
const showSuccessDialog = ref(false);
const successData = reactive({
  title: "",
  message: "",
  confirmText: "我知道了",
  cancelText: "取消",
  showCancel: false,
  successIcon: "",
  closeIcon: "",
  onConfirm: null,
  onCancel: null,
});

// 失败弹窗数据
const showErrorDialog = ref(false);
const errorData = reactive({
  title: "",
  message: "",
  confirmText: "确定",
  cancelText: "取消",
  showCancel: false,
  errorIcon: "",
  closeIcon: "",
  onConfirm: null,
  onCancel: null,
});

// 确认弹窗数据
const showConfirmDialog = ref(false);
const confirmData = reactive({
  title: "",
  message: "",
  confirmText: "确定",
  cancelText: "取消",
  confirmIcon: "",
  closeIcon: "",
  onConfirm: null,
  onCancel: null,
});

// 计算属性
const title = computed(() => successData.title);
const message = computed(() => successData.message);
const confirmText = computed(() => successData.confirmText);
const cancelText = computed(() => successData.cancelText);
const showCancel = computed(() => successData.showCancel);
const successIcon = computed(() => successData.successIcon);
const closeIcon = computed(() => successData.closeIcon);

const errorTitle = computed(() => errorData.title);
const errorMessage = computed(() => errorData.message);
const errorConfirmText = computed(() => errorData.confirmText);
const errorCancelText = computed(() => errorData.cancelText);
const errorShowCancel = computed(() => errorData.showCancel);
const errorIcon = computed(() => errorData.errorIcon);

const confirmTitle = computed(() => confirmData.title);
const confirmMessage = computed(() => confirmData.message);
const confirmConfirmText = computed(() => confirmData.confirmText);
const confirmCancelText = computed(() => confirmData.cancelText);
const confirmIcon = computed(() => confirmData.confirmIcon);

// 成功弹窗方法
const showSuccess = (config) => {
  Object.assign(successData, {
    title: "操作成功",
    message: "",
    confirmText: "我知道了",
    cancelText: "取消",
    showCancel: false,
    successIcon: "",
    closeIcon: "",
    onConfirm: null,
    onCancel: null,
    ...config,
  });
  showSuccessDialog.value = true;
};

const closeSuccess = () => {
  showSuccessDialog.value = false;
};

const handleConfirm = () => {
  if (successData.onConfirm && typeof successData.onConfirm === "function") {
    successData.onConfirm();
  }
  closeSuccess();
};

const handleCancel = () => {
  if (successData.onCancel && typeof successData.onCancel === "function") {
    successData.onCancel();
  }
  closeSuccess();
};

// 失败弹窗方法
const showError = (config) => {
  Object.assign(errorData, {
    title: "操作失败",
    message: "",
    confirmText: "确定",
    cancelText: "取消",
    showCancel: false,
    errorIcon: "",
    closeIcon: "",
    onConfirm: null,
    onCancel: null,
    ...config,
  });
  showErrorDialog.value = true;
};

const closeError = () => {
  showErrorDialog.value = false;
};

const handleErrorConfirm = () => {
  if (errorData.onConfirm && typeof errorData.onConfirm === "function") {
    errorData.onConfirm();
  }
  closeError();
};

const handleErrorCancel = () => {
  if (errorData.onCancel && typeof errorData.onCancel === "function") {
    errorData.onCancel();
  }
  closeError();
};

// 确认弹窗方法
const showConfirm = (config) => {
  Object.assign(confirmData, {
    title: "提示",
    message: "",
    confirmText: "确定",
    cancelText: "取消",
    confirmIcon: "",
    closeIcon: "",
    onConfirm: null,
    onCancel: null,
    ...config,
  });
  showConfirmDialog.value = true;
  return new Promise((resolve, reject) => {
    confirmData.onConfirm = () => resolve(true);
    confirmData.onCancel = () => resolve(false);
  });
};

const closeConfirm = () => {
  showConfirmDialog.value = false;
};

const handleConfirmConfirm = () => {
  if (confirmData.onConfirm && typeof confirmData.onConfirm === "function") {
    confirmData.onConfirm();
  }
  closeConfirm();
};

const handleConfirmCancel = () => {
  if (confirmData.onCancel && typeof confirmData.onCancel === "function") {
    confirmData.onCancel();
  }
  closeConfirm();
};

// 导出方法
defineExpose({
  showSuccess,
  showError,
  showConfirm,
});
</script>

<style scoped>
.message-dialog {
  border-radius: 12px;
  overflow: hidden;
}

.dialog-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 200px;
}

.close-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.close-icon img {
  width: 100%;
  height: 100%;
}

.close-text {
  font-size: 24px;
  color: #999;
  line-height: 1;
  cursor: pointer;
}

.icon-area {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0 15px 0;
}

.icon-image {
  width: 100%;
  height: 100%;
}

.icon-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.icon-symbol {
  font-size: 30px;
  font-weight: bold;
  line-height: 1;
}

.success-dialog .icon-area {
  background-color: #e8f5e9;
}

.success-icon {
  color: #4caf50;
}

.error-dialog .icon-area {
  background-color: #ffebee;
}

.error-icon {
  color: #f44336;
}

.confirm-dialog .icon-area {
  background-color: #fff3e0;
}

.confirm-icon {
  color: #ff9800;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.message {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 25px;
  word-break: break-word;
  padding: 0 10px;
}

.actions {
  display: flex;
  width: 100%;
  gap: 12px;
  justify-content: center;
}

.btn {
  flex: 1;
  height: 44px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 200px;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #666;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.confirm-btn {
  background: linear-gradient(to right, #4caf50, #2e7d32);
  color: white;
}

.confirm-btn:hover {
  background: linear-gradient(to right, #43a047, #1b5e20);
}

.error-dialog .confirm-btn {
  background: linear-gradient(to right, #f44336, #d32f2f);
}

.error-dialog .confirm-btn:hover {
  background: linear-gradient(to right, #e53935, #c62828);
}

.confirm-dialog .confirm-btn {
  background: linear-gradient(to right, #2196f3, #1976d2);
}

.confirm-dialog .confirm-btn:hover {
  background: linear-gradient(to right, #1e88e5, #1565c0);
}
</style>
