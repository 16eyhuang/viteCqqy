// src/utils/message.js
import { createApp, h, ref } from "vue";
import MessageDialog from "../components/MessageDialog/index.vue";

// 单例实例
let messageInstance = null;
let container = null;

// 创建消息实例
const createMessage = () => {
  if (messageInstance) {
    return messageInstance;
  }

  // 创建容器
  container = document.createElement("div");
  container.id = "message-dialog-container";
  document.body.appendChild(container);

  // 创建应用实例
  const app = createApp({
    render() {
      return h(MessageDialog, { ref: "messageDialog" });
    },
    mounted() {
      messageInstance = this.$refs.messageDialog;
    },
  });

  // 挂载
  app.mount(container);

  return messageInstance;
};

// 获取消息实例
const getMessageInstance = () => {
  if (!messageInstance) {
    createMessage();
  }
  return messageInstance;
};

// 成功提示
export const success = (message, options = {}) => {
  const instance = getMessageInstance();
  if (!instance) return;

  const config =
    typeof message === "string" ? { message, ...options } : message;

  instance.showSuccess(config);
};

// 失败提示
export const error = (message, options = {}) => {
  const instance = getMessageInstance();
  if (!instance) return;

  const config =
    typeof message === "string" ? { message, ...options } : message;

  instance.showError(config);
};

// 确认提示（返回Promise）
export const confirm = (message, options = {}) => {
  const instance = getMessageInstance();
  if (!instance) return Promise.resolve(false);

  const config =
    typeof message === "string" ? { message, ...options } : message;

  return instance.showConfirm(config);
};

// 在组件中使用的组合式函数
export const useMessage = () => {
  const instance = getMessageInstance();

  return {
    success: (message, options) => {
      if (instance)
        instance.showSuccess(
          typeof message === "string" ? { message, ...options } : message,
        );
    },
    error: (message, options) => {
      if (instance)
        instance.showError(
          typeof message === "string" ? { message, ...options } : message,
        );
    },
    confirm: (message, options) => {
      if (instance)
        return instance.showConfirm(
          typeof message === "string" ? { message, ...options } : message,
        );
      return Promise.resolve(false);
    },
  };
};

// 默认导出
export default {
  success,
  error,
  confirm,
  useMessage,
};
