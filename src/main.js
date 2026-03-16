import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue';
import router from './router';

// 引入封装的 message 工具
import message from './utils/message';

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

// 挂载到全局
app.config.globalProperties.$message = message;

// 初始化消息组件
import './utils/message'; // 这会自动创建单例

app.mount('#app')
