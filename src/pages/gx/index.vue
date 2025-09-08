<template>
  <div class="container">
    <div class="background">
      <img src="../../asserts/gx/background.png" alt="" style="width: 100%" />
    </div>
    <van-cell-group inset>
      <van-field
        v-model="phone"
        placeholder="请输入手机号码"
        type="tel"
        style="font-size: 4vw"
        class="phone-field"
        autofocus
      />
    </van-cell-group>
    <van-button
      color="linear-gradient(to bottom, #ffb929, #fb7421)"
      class="get-button"
      :loading="buttonLoading"
      @click="getButtonClick"
    >
      观看
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
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import { baseUrlTelegram, serveName } from "../../utils/util.js";

const phone = ref(""); // 电话号码
const info1 = ref(false); // 是否显示提示框
const infoText = ref(""); // 提示框内容
const buttonLoading = ref(false); // 观看按钮加载中状态

/**
 * @description 弹出提示框
 * @param {string} text - 提示内容
 */
function showInfo(text) {
  infoText.value = text;
  info1.value = true;
  setTimeout(() => {
    info1.value = false;
  }, 3000);
}

/**
 * @description 获取token并存储到本地
 */
function getToken() {
  axios
    .post(
      `${baseUrlTelegram}/oauth/oauth/token?client_id=client&client_secret=secret_881&grant_type=client_credentials`
    )
    .then((res) => {
      console.log("res: ", res);
      if (res?.status === 200) {
        window.localStorage.setItem("access_token", res?.data?.access_token);
      }
    });
}

function getButtonClick() {
  const access_token = localStorage.getItem("access_token");
  if (!phone.value) {
    showInfo("请先输入手机号！");
    return;
  }
  buttonLoading.value = true;
  axios({
    method: "POST",
    url: `${baseUrlTelegram}${serveName}/v1/0/yk-lt-zy-orders/gxzs?phone=${phone.value}&agentCode=HBLT&access_token=${access_token}`,
  })
    .then((res) => {
      if (res?.status === 200 && res?.data?.code === "0") {
        location.href = res?.data?.strData;
      } else {
        showInfo(res?.data?.msg || "未查询到办理订单");
      }
    })
    .catch((err) => {
      console.error("error: ", err);
      showInfo("查询失败！未查询到办理订单");
    })
    .finally(() => {
      buttonLoading.value = false;
    });
}

onBeforeMount(() => {
  document.title = "爱艺术+会员权益课程包";
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
    width: 69.84vw;
    height: 10.43vw;
    left: 15.02vw;
    top: 80vw;
    border: 0.2vw solid #666;
    border-radius: 1vw;
  }
  .get-button {
    position: absolute;
    width: 69.84vw;
    height: 11.6vw;
    left: 15.02vw;
    top: 96vw;
    font-size: 6vw;
    font-weight: bolder;
    border-radius: 7vw;
  }
}
</style>
