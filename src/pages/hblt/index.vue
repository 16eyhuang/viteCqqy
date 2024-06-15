<template>
  <div class="container">
    <div class="background">
      <img src="../../asserts/hblt/background.jpg" alt="" style="width: 100%" />
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

    <!-- <img
      src="../../asserts/hblt/inputAfterText.png"
      alt=""
      class="img-input-after-text"
    /> -->

    <van-button
      color="linear-gradient(to bottom, #ffb929, #fb7421)"
      class="get-button"
      @click="getButtonClick"
    >
      点击领取
    </van-button>

    <!-- 提示信息弹窗 -->
    <van-dialog v-model:show="info1" width="60vw" :showConfirmButton="false" closeOnClickOverlay>
      <div style="width: 60vw; text-align: center; display: flex; flex-direction: column; font-size: 4vw; padding: 5vw 0;">
        <div>{{ infoText }}</div>
      </div>
    </van-dialog>

    <!--即将领取弹窗-->
    <van-dialog v-model:show="showPreGet" :showConfirmButton="false" closeOnClickOverlay width="80vw">
      <div style="display: flex; flex-direction: column; width: 80vw; padding: 5vw; min-height: 30vh;">
        <div style="display: flex;">
          <img src="../../asserts/xIcon.png" alt="" style="width: 6vw; height: 6.67vw; margin-left: 65vw;" @click="showPreGet = false">
        </div>
        <div style="font-size: 6.25vw; font-weight: bold; margin-left: 1vw; margin-top: 3vw;">
          即将领取爱奇艺视频月卡
        </div>
        <div style="display: flex;">
          <img src="../../asserts/getPage/aiqiyiLogo.png" alt="" style="width: 26.27vw; height: 26vw; margin-left: 22vw; margin-top: 7vw;">
        </div>
        <div style="font-size: 4vw; color: #666; margin-left: 1vw; margin-top: 7vw;">
          受理成功后，将消耗一次本月领取资格
        </div>
        <div style="display: flex;">
          <van-button
            color="linear-gradient(to bottom right, #6ee7b7, #3b82f6, #9333ea)"
            style="width: 48.4vw; height: 11.6vw; font-size: 5vw; border-radius: 5vw; margin-top: 3vw; margin-left: 11vw;"
            :loading="getButtonLoading"
            :disabled="getButtonDisabled"
            @click="handleConfirm"
          >
            确认领取
          </van-button>
        </div>
      </div>
    </van-dialog>

    <!--受理成功弹窗-->
    <van-dialog v-model:show="showHandleSuccess" :showConfirmButton="false" closeOnClickOverlay width="80vw">
      <div style="display: flex; flex-direction: column; width: 80vw; padding: 5vw; min-height: 30vh;">
        <div style="display: flex;">
          <img src="../../asserts/xIcon.png" alt="" style="width: 6vw; height: 6.67vw; margin-left: 65vw;" @click="showHandleSuccess = false">
        </div>
        <div style="display: flex;">
          <img src="../../asserts/successBackground.png" alt="" style="width: 33.33vw; height: 33.33vw; margin-left: 19vw;">
          <img src="../../asserts/successCheck.png" alt="" style="width: 16.8vw; height: 17.07vw; margin-left: -25vw; margin-top: 8vw;">
        </div>
        <div style="font-size: 6.25vw; font-weight: bold; margin-left: 23vw; margin-top: 3vw;">
          受理成功
        </div>
        <!-- <div style="font-size: 3.25vw; color: #666; margin-left: 2vw; margin-top: 7vw;">
          将发送手机号码对应的爱奇艺账号请及时查收
        </div> -->
        <div style="display: flex;">
          <van-button
            color="linear-gradient(to bottom right, #6ee7b7, #3b82f6, #9333ea)"
            style="width: 48.4vw; height: 11.6vw; font-size: 5vw; border-radius: 5vw; margin-top: 3vw; margin-left: 11vw;"
            @click="showHandleSuccess = false"
          >
            知道了
          </van-button>
        </div>
      </div>
    </van-dialog>

    <!--受理失败弹窗-->
    <van-dialog v-model:show="showHandleFail" :showConfirmButton="false" closeOnClickOverlay width="80vw">
      <div style="display: flex; flex-direction: column; width: 80vw; padding: 5vw; min-height: 30vh;">
        <div style="display: flex;">
          <img src="../../asserts/xIcon.png" alt="" style="width: 6vw; height: 6.67vw; margin-left: 65vw;" @click="showHandleFail = false">
        </div>
        <div style="display: flex;">
          <img src="../../asserts/successBackground.png" alt="" style="width: 33.33vw; height: 33.33vw; margin-left: 19vw;">
          <img src="../../asserts/failX.png" alt="" style="width: 16.8vw; height: 17.07vw; margin-left: -25vw; margin-top: 8vw;">
        </div>
        <div style="display: flex;">
          <img src="../../asserts/failText.png" alt="" style="width: 24vw; height: 6.13vw; margin-left: 24vw; margin-top: 3vw;">
        </div>
        <div style="display: flex;">
          <van-button
            color="linear-gradient(to bottom right, #6ee7b7, #3b82f6, #9333ea)"
            style="width: 48.4vw; height: 11.6vw; font-size: 5vw; border-radius: 5vw; margin-top: 3vw; margin-left: 12vw;"
            @click="showHandleFail = false"
          >
            知道了
          </van-button>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrlTelegram, serveName } from "../../utils/util.js";

export default {
  name: "hblt",
  data() {
    return {
      phone: "", // 手机号
      showPreGet: false, // 是否显示即将领取弹窗
      getButtonLoading: false, // 确认领取按钮是否处于加载中状态
      getButtonDisabled: false, // 确认领取按钮是否处于禁用状态
      showHandleSuccess: false, // 是否显示受理成功弹窗
      showHandleFail: false, // 是否显示受理失败弹窗
      info1: false, // 是否显示提示信息弹窗
      infoText: '', // 提示信息弹窗文字
    };
  },
  created() {
    document.title = "联通爱奇艺";
    this.getToken();
  },
  methods: {
    showInfo(text) {
      this.infoText = text
      this.info1 = true;
      setTimeout(() => {
        this.info1 = false;
      }, 3000);
    },
    // 获取token并存储到本地
    getToken() {
      axios
        .post(
          `${baseUrlTelegram}/oauth/oauth/token?client_id=client&client_secret=secret_881&grant_type=client_credentials`
        )
        .then((res) => {
          if (res?.status === 200) {
            window.localStorage.setItem(
              "access_token",
              res?.data?.access_token
            );
          }
        });
    },
    getButtonClick() {
      if (!this.phone) {
        this.showInfo('请先输入手机号！');
        return;
      }
      this.showPreGet = true;
    },
    // 领取接口
    doGet(phone) {
      const access_token = localStorage.getItem('access_token');
      return new Promise((resolve) => {
        axios({
          method: 'POST',
          url: `${baseUrlTelegram}${serveName}/v1/0/yk-cqqy-receive-orders/action?phone=${phone}&access_token=${access_token}&agentCode=HBLT`,
        }).then((res) => {
          console.log('res: ', res);
          if (res?.status === 200 && res?.data?.code === '0000') {
            this.showHandleSuccess = true;
          } else {
            this.showHandleFail = true;
          }
          resolve();
        }).catch(() => {
          this.showHandleFail = true;
          resolve();
        });
      });
    },
    async handleConfirm() {
      this.getButtonDisabled = true;
      this.getButtonLoading = true;
      await this.doGet(this.phone);
      this.showPreGet = false;
      this.getButtonDisabled = false;
      this.getButtonLoading = false;
    },
  },
};
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
    top: 115vw;
    border: 0.2vw solid #666;
    border-radius: 1vw;
  }
  .img-input-after-text {
    position: absolute;
    width: 76.4vw;
    height: 6.67vw;
    left: 11.2vw;
    top: 123.2vw;
  }
  .get-button {
    position: absolute;
    width: 69.84vw;
    height: 11.6vw;
    left: 15.02vw;
    top: 133.73vw;
    font-size: 6vw;
    font-weight: bolder;
    border-radius: 7vw;
  }
}
</style>
