<template>
  <div class="container">
    <div class="background">
      <img
        src="../../asserts/5GHandlePage/background.png"
        alt=""
        style="width: 100%"
      />
    </div>
    <van-cell-group inset class="phone-field">
      <van-field
        v-model="phone"
        placeholder="请输入移动手机号码"
        type="tel"
        style="font-size: 3.5vw"
        autofocus
      />
    </van-cell-group>
    <van-cell-group inset class="sms-code-field">
      <van-field
        v-model="smsCode"
        placeholder="请输入短信验证码"
        type="digit"
        style="font-size: 3vw"
      />
    </van-cell-group>
    <van-button
      color="#f77219"
      class="sms-code-button"
      :loading="smsButtonLoading"
      :disabled="smsButtonDisabled"
      @click="smsButtonClick"
    >
      {{ smsButtonText }}
    </van-button>

    <van-button
      color="linear-gradient(to bottom, #ffb929, #fb7421)"
      class="handle-button"
      :loading="handleButtonLoading"
      :disabled="handleButtonDisabled"
      @click="handleButtonClick"
    >
      <span style="color: rgb(192, 99, 36)">立即订购</span>
    </van-button>

    <van-dialog
      v-model:show="info1"
      width="60vw"
      :showConfirmButton="false"
      closeOnClickOverlay
    >
      <div
        style="
          width: 60vw;
          text-align: center;
          display: flex;
          flex-direction: column;
          font-size: 4vw;
          padding: 5vw 0;
        "
      >
        <div>{{ infoText }}</div>
      </div>
    </van-dialog>

    <!--受理成功弹窗-->
    <van-dialog
      v-model:show="showHandleSuccess"
      :showConfirmButton="false"
      closeOnClickOverlay
      width="80vw"
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          width: 80vw;
          padding: 5vw;
          min-height: 30vh;
        "
      >
        <div style="display: flex">
          <img
            src="../../asserts/xIcon.png"
            alt=""
            style="width: 6vw; height: 6.67vw; margin-left: 65vw"
            @click="handleCloseSuccess"
          />
        </div>
        <div style="display: flex">
          <img
            src="../../asserts/successBackground.png"
            alt=""
            style="width: 33.33vw; height: 33.33vw; margin-left: 20vw"
          />
          <img
            src="../../asserts/successCheck.png"
            alt=""
            style="
              width: 16.8vw;
              height: 17.07vw;
              margin-left: -25vw;
              margin-top: 8vw;
            "
          />
        </div>
        <div style="display: flex">
          <img
            src="../../asserts/successText.png"
            alt=""
            style="
              width: 24vw;
              height: 6.13vw;
              margin-left: 25vw;
              margin-top: 3vw;
            "
          />
        </div>
        <div style="display: flex">
          <van-button
            color="linear-gradient(to bottom, #ffb929, #fb7421)"
            style="
              width: 48.4vw;
              height: 11.6vw;
              font-size: 5vw;
              border-radius: 5vw;
              margin-top: 3vw;
              margin-left: 12vw;
            "
            @click="handleCloseSuccess"
          >
            知道了
          </van-button>
        </div>
      </div>
    </van-dialog>

    <!--受理失败弹窗-->
    <van-dialog
      v-model:show="showHandleFail"
      :showConfirmButton="false"
      closeOnClickOverlay
      width="80vw"
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          width: 80vw;
          padding: 5vw;
          min-height: 30vh;
        "
      >
        <div style="display: flex">
          <img
            src="../../asserts/xIcon.png"
            alt=""
            style="width: 6vw; height: 6.67vw; margin-left: 65vw"
            @click="handleCloseFail"
          />
        </div>
        <div style="display: flex">
          <img
            src="../../asserts/failBackground.png"
            alt=""
            style="width: 33.33vw; height: 33.33vw; margin-left: 20vw"
          />
          <img
            src="../../asserts/failX.png"
            alt=""
            style="
              width: 16.8vw;
              height: 17.07vw;
              margin-left: -25vw;
              margin-top: 8vw;
            "
          />
        </div>
        <div style="display: flex">
          <img
            src="../../asserts/failText.png"
            alt=""
            style="
              width: 24vw;
              height: 6.13vw;
              margin-left: 25vw;
              margin-top: 3vw;
            "
          />
        </div>
        <div style="display: flex">
          <van-button
            color="linear-gradient(to bottom, #ffb929, #fb7421)"
            style="
              width: 48.4vw;
              height: 11.6vw;
              font-size: 5vw;
              border-radius: 5vw;
              margin-top: 3vw;
              margin-left: 12vw;
            "
            @click="handleCloseFail"
          >
            知道了
          </van-button>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import { baseUrl, serveName } from "../../utils/util.js";

const phone = ref(""); // 手机号
const smsCode = ref(""); // 验证码
const smsButtonText = ref("获取验证码"); // 验证码按钮文字
const smsButtonLoading = ref(false); // 验证码按钮加载中状态
const smsButtonDisabled = ref(false); // 验证码按钮是否禁用
const handleButtonLoading = ref(false); // 办理按钮加载中状态
const handleButtonDisabled = ref(false); // 办理按钮是否禁用
const showHandleSuccess = ref(false); // 是否显示处理成功弹窗
const showHandleFail = ref(false); // 是否显示处理失败弹窗
const info1 = ref(false); // 是否显示告警信息
const infoText = ref(""); // 告警弹窗信息
const orderId = ref(""); // 验证码ID

function showInfo(text) {
  infoText.value = text;
  info1.value = true;
  setTimeout(() => {
    info1.value = false;
  }, 3000);
}

// 获取短信验证码接口
function getSmsCode(phone) {
  const access_token = localStorage.getItem("access_token");
  return new Promise((resolve) => {
    axios({
      method: "POST",
      url: `${baseUrl}${serveName}/v1/0/yk-cq-quanyi-orders/external/sendHjy30Sms?phone=${phone}&access_token=${access_token}`,
    })
      .then((res) => {
        if (res?.status === 200 && res?.data?.code === "0000") {
          showInfo("验证码已发送！");
          orderId.value = res?.data?.orderId;
        }
        resolve();
      })
      .catch(() => {
        showInfo("获取验证码失败，请稍后重试！");
        resolve();
      });
  });
}

// 点击验证码按钮
async function smsButtonClick() {
  if (!phone.value) {
    showInfo("请先输入手机号！");
    return;
  }
  smsButtonLoading.value = true;
  smsButtonDisabled.value = true;
  await getSmsCode(phone.value);
  smsButtonLoading.value = false;
  let countDown = 30;
  smsButtonText.value = `${countDown}秒后获取`;
  countDown--;
  const timer = setInterval(() => {
    if (countDown === 0) {
      smsButtonDisabled.value = false;
      smsButtonText.value = "获取验证码";
      clearInterval(timer);
    } else {
      smsButtonText.value = `${countDown}秒后获取`;
      countDown--;
    }
  }, 1000);
}

// 立即办理接口
function doOrderAccept(phone, orderId, smsCode) {
  const access_token = localStorage.getItem("access_token");
  return new Promise((resolve) => {
    axios({
      method: "POST",
      url: `${baseUrl}${serveName}/v1/0/yk-cq-quanyi-orders/external/orderHjy30Accept?orderId=${orderId}&phone=${phone}&smsCode=${smsCode}&access_token=${access_token}`,
    })
      .then((res) => {
        if (res?.status === 200 && ['2066', '0000'].includes(res?.data?.code)) {
          showHandleSuccess.value = true;
        } else {
          showHandleFail.value = true;
        }
        resolve();
      })
      .catch(() => {
        showHandleFail.value = true;
        resolve();
      });
  });
}

// 点击立即办理
async function handleButtonClick() {
  if (!phone.value) {
    showInfo("请先输入手机号！");
    return;
  }
  if (!smsCode.value) {
    showInfo("请先输入验证码！");
    return;
  }
  if (!orderId.value) {
    showInfo("请先获取验证码！");
    return;
  }
  handleButtonDisabled.value = true;
  handleButtonLoading.value = true;
  await doOrderAccept(phone.value, orderId.value, smsCode.value);
  handleButtonDisabled.value = false;
  handleButtonLoading.value = false;
}

function handleCloseSuccess() {
  showHandleSuccess.value = false;
}

function handleCloseFail() {
  showHandleFail.value = false;
}

// 获取token并存储到本地
function getToken() {
  axios
    .post(
      `${baseUrl}/oauth/oauth/token?client_id=client&client_secret=secret_881&grant_type=client_credentials`
    )
    .then((res) => {
      if (res?.status === 200) {
        window.localStorage.setItem("access_token", res?.data?.access_token);
      }
    });
}

onBeforeMount(() => {
  document.title = "移动爱奇艺";
  getToken();
});
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  position: relative;
  .background {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .phone-field {
    position: absolute;
    width: 85vw;
    height: 10.53vw;
    left: 3vw;
    top: 100vw;
    border: 0.2vw solid #666;
    border-radius: 50px;
  }
  .sms-code-field {
    position: absolute;
    width: 55vw;
    height: 10.53vw;
    left: 3vw;
    top: 115vw;
    border: 0.2vw solid #666;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }
  .sms-code-button {
    position: absolute;
    width: 30.8vw;
    height: 11.2vw;
    left: 62.3vw;
    top: 115vw;
    font-size: 3.5vw;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
  }
  .handle-button {
    position: absolute;
    width: 50vw;
    height: 13vw;
    left: 25vw;
    top: 135vw;
    font-size: 7vw;
    font-weight: bolder;
    border-radius: 50px;
  }
}
</style>
