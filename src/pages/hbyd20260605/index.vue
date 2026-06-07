<template>
  <div class="container">
    <div class="background">
      <img src="../../asserts/hbyd20260605/background.png" alt="" style="width: 100%" />
    </div>

    <van-cell-group inset>
      <van-field
        v-model="phone"
        placeholder="请输入手机号码"
        type="tel"
        style="font-size: 4vw"
        class="phone-field"
        maxlength="11"
        autofocus
      />
    </van-cell-group>

    <van-button
      color="linear-gradient(to bottom, #fef248, #ffa21e)"
      class="get-button"
      @click="getButtonClick"
    >
      立即激活
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

    <!--即将领取弹窗-->
    <van-dialog
      v-model:show="showPreGet"
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
            @click="showPreGet = false"
          />
        </div>
        <div
          style="
            font-size: 6.25vw;
            font-weight: bold;
            margin-left: 1vw;
            margin-top: 3vw;
          "
        >
          即将激活爱奇艺会员
        </div>
        <div style="display: flex">
          <img
            src="../../asserts/getPage/aiqiyiLogo.png"
            alt=""
            style="
              width: 26.27vw;
              height: 26vw;
              margin-left: 22vw;
              margin-top: 7vw;
            "
          />
        </div>
        <!-- <div
          style="font-size: 4vw; color: #666; margin-left: 1vw; margin-top: 7vw"
        >
          领取成功后，将消耗一次本月领取资格
        </div> -->
        <div style="display: flex">
          <van-button
            color="linear-gradient(to bottom, #ffb929, #fb7421)"
            style="
              width: 48.4vw;
              height: 11.6vw;
              font-size: 5vw;
              border-radius: 5vw;
              margin-top: 3vw;
              margin-left: 11vw;
            "
            :loading="getButtonLoading"
            :disabled="getButtonDisabled"
            @click="handleConfirm"
          >
            确认激活
          </van-button>
        </div>
      </div>
    </van-dialog>

    <!--领取成功弹窗-->
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
            @click="showHandleSuccess = false"
          />
        </div>
        <div style="display: flex">
          <img
            src="../../asserts/successBackground.png"
            alt=""
            style="width: 33.33vw; height: 33.33vw; margin-left: 19vw"
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
        <div
          style="
            font-size: 6.25vw;
            font-weight: bold;
            margin-left: 26vw;
            margin-top: 3vw;
          "
          :style="{ marginLeft: successType === 1 ? '23vw' : '26vw' }"
        >
          {{ successType === 1 ? "领取成功" : "已领取" }}
        </div>
        <div
          style="
            font-size: 3.25vw;
            color: #666;
            margin-left: 2vw;
            margin-top: 7vw;
          "
          v-if="successType === 1"
        >
          将发送手机号码对应的爱奇艺账号请及时查收
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
              margin-left: 11vw;
            "
            @click="showHandleSuccess = false"
          >
            知道了
          </van-button>
        </div>
      </div>
    </van-dialog>

    <!--领取失败弹窗-->
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
            @click="showHandleFail = false"
          />
        </div>
        <div style="display: flex">
          <img
            src="../../asserts/failBackground.png"
            alt=""
            style="width: 33.33vw; height: 33.33vw; margin-left: 19vw"
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
              margin-left: 24vw;
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
            @click="showHandleFail = false"
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
import { baseUrlTelegram, serveName } from "../../utils/util.js";

const phone = ref(""); // 电话号码
const showPreGet = ref(false); // 是否显示预领取弹框
const infoText = ref(""); // 提示消息
const info1 = ref(false); // 提示框是否显示
const getButtonLoading = ref(false);
const getButtonDisabled = ref(false);
const showHandleSuccess = ref(false);
const showHandleFail = ref(false);
const successType = ref("");

/**
 * @description 获取token并存储到本地
 */
function getToken() {
  axios
    .post(
      `${baseUrlTelegram}/oauth/oauth/token?client_id=client&client_secret=secret_881&grant_type=client_credentials`
    )
    .then((res) => {
      console.log("getToken res: ", res);
      if (res?.status === 200) {
        window.localStorage.setItem("access_token", res?.data?.access_token);
      }
    });
}

function showInfo(text) {
  infoText.value = text;
  info1.value = true;
  setTimeout(() => {
    info1.value = false;
  }, 3000);
}

function getButtonClick() {
  if (!phone.value) {
    showInfo("请输入您的手机号！");
    return;
  }
  showPreGet.value = true;
}

async function handleConfirm() {
  getButtonDisabled.value = true;
  getButtonLoading.value = true;
  await doGet(phone.value);
  showPreGet.value = false;
  getButtonDisabled.value = false;
  getButtonLoading.value = false;
}

// 领取接口
function doGet(phone) {
  const access_token = localStorage.getItem("access_token");
  return new Promise((resolve) => {
    axios({
      method: "POST",
      url: `${baseUrlTelegram}${serveName}/v1/0/yk-cqqy-receive-orders/action?phone=${phone}&access_token=${access_token}&agentCode=BJWY`,
    })
      .then((res) => {
        console.log("doGet res: ", res);
        if (res?.status === 200 && res?.data?.code === "0000") {
          showHandleSuccess.value = true;
          successType.value = 1;
        } else if (res?.data?.code === "Y") {
          showHandleSuccess.value = true;
          successType.value = 2;
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

onBeforeMount(() => {
  document.title = "白金权益";
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
    top: 140vw;
    // border: 0.2vw solid #666;
    border-radius: 10vw;
  }
  .get-button {
    position: absolute;
    width: 50vw;
    height: 11.6vw;
    left: 25vw;
    top: 160vw;
    font-size: 6vw;
    font-weight: bolder;
    border-radius: 7vw;
    color: #cf6203 !important;
  }
}
</style>
