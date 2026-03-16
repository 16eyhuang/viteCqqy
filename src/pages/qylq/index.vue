<template>
  <div class="container">
    <div class="background">
      <img src="../../asserts/qylq/background.jpg" alt="" style="width: 100%" />
    </div>

    <!-- 第一个立即领取按钮 -->
    <van-button
      color="linear-gradient(to bottom, #ffb929, #fb7421)"
      class="get-button"
      @click="showPhoneDialog = true"
    >
      立即领取
    </van-button>

    <!-- 第二个立即领取按钮 -->
    <van-button
      color="linear-gradient(to bottom, #ffb929, #fb7421)"
      class="get-button"
      @click="showPhoneDialog = true"
      style="top: 107vw"
    >
      立即领取
    </van-button>

    <!-- 手机号输入弹窗 -->
    <van-dialog
      v-model:show="showPhoneDialog"
      :showConfirmButton="false"
      :showCancelButton="false"
      closeOnClickOverlay
      width="80vw"
      class="phone-input-dialog"
    >
      <div class="dialog-content">
        <!-- 标题 -->
        <div class="dialog-title">请输入手机号</div>

        <!-- 输入框 -->
        <van-field
          v-model="phoneNumber"
          type="tel"
          placeholder="请填写手机号码"
          maxlength="11"
          clearable
          class="phone-input"
          :rules="[{ required: true, message: '请输入手机号' }]"
        />

        <!-- 按钮区域 -->
        <div class="button-group">
          <van-button class="close-btn" @click="handleClose"> 关闭 </van-button>
          <van-button
            class="submit-btn"
            :disabled="!isPhoneValid"
            @click="handleSubmit"
          >
            领取
          </van-button>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import axios from "axios";
import { baseUrlTelegram, serveName } from "../../utils/util.js";
// 导入封装的 message 工具
import { success, error } from "../../utils/message";

// 手机号弹窗相关
const showPhoneDialog = ref(false);
const phoneNumber = ref("");

// 手机号验证
const isPhoneValid = computed(() => {
  return /^1[3-9]\d{9}$/.test(phoneNumber.value);
});

// 手机号弹窗关闭
const handleClose = () => {
  showPhoneDialog.value = false;
  phoneNumber.value = "";
};

// 手机号弹窗提交
const handleSubmit = () => {
  if (!isPhoneValid.value) {
    // 这里可以添加 Toast 提示
    // this.$toast('请输入正确的手机号');
    console.log("请输入正确的手机号");
    return;
  }

  // 这里调用领取接口
  console.log("提交手机号:", phoneNumber.value);

  doGet(phoneNumber.value).then(() => {
    // 领取完成后的操作
    // 例如：关闭弹窗、显示成功提示等
    console.log("领取接口调用完成");
    // 提交成功后可以关闭弹窗，或者跳转到其他页面
    handleClose();
  });

  /**
   * @description 获取token并存储到本地
   */
  function getToken() {
    axios
      .post(
        `${baseUrlTelegram}/oauth/oauth/token?client_id=client&client_secret=secret_881&grant_type=client_credentials`,
      )
      .then((res) => {
        console.log("res: ", res);
        if (res?.status === 200) {
          window.localStorage.setItem("access_token", res?.data?.access_token);
        }
      });
  }

  // 领取接口
  function doGet(phone) {
    const access_token = localStorage.getItem("access_token");
    return new Promise((resolve) => {
      axios({
        method: "POST",
        url: `${baseUrlTelegram}${serveName}/v1/0/yk-yd-zfb-coupon-orders/action?mobile=${phone}&access_token=${access_token}`,
      })
        .then((res) => {
          console.log("res: ", res);
          if (res?.status === 200 && res?.data?.code === "0000") {
            success({
              title: "提示",
              message: "领取成功！",
              confirmText: "我知道了",
            });
          } else {
            error({
              title: "提示",
              message: res?.data?.message || "领取失败，请稍后再试",
              confirmText: "我知道了",
            });
          }
          resolve();
        })
        .catch((err) => {
          console.error("领取接口错误: ", err);
          error({
            title: "提示",
            message: "领取失败，请稍后再试",
            confirmText: "我知道了",
          });
          resolve();
        });
    });
  }

  onBeforeMount(() => {
    document.title = "权益领取";
    getToken();
  });
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #f5f5f5;
  .background {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .get-button {
    position: absolute;
    width: 20vw;
    height: 8vw;
    left: 65vw;
    top: 69vw;
    font-size: 3vw;
    font-weight: bolder;
    border-radius: 1vw;
  }
}

/* 手机号输入弹窗样式 */
.phone-input-dialog {
  border-radius: 12px;
  overflow: hidden;
}

.dialog-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dialog-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.phone-input {
  width: 100%;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 30px;
}

.phone-input .van-field__control {
  text-align: center;
  font-size: 16px;
}

.button-group {
  display: flex;
  width: 100%;
  gap: 12px;
}

.close-btn {
  flex: 1;
  background: white;
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  height: 44px;
}

.submit-btn {
  flex: 1;
  background: linear-gradient(to bottom, #1989fa, #0077ff);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  height: 44px;
}

.submit-btn:disabled {
  background: #cccccc;
  color: #999;
}
</style>
