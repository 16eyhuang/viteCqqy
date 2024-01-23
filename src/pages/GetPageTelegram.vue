<template>
  <div class="container">
    <div class="background">
      <img src="../asserts/getPageTelegram/background.png" alt="" style="width: 100%;">
    </div>
    <img src="../asserts/爱奇艺会员-logo.png" alt="" class="img-aiqiyi">
    <img src="../asserts/中国电信.png" alt="" class="img-china-mobile">
    <img src="../asserts/getPageTelegram/topText.png" alt="" class="img-top-text">
    <img src="../asserts/getPageTelegram/四川电信用户专享.png" alt="" class="img-center-text">
    <img src="../asserts/getPage/circleMatrix.png" alt="" class="img-circle-matrix">
    <img src="../asserts/getPage/leftGift.png" alt="" class="img-left-gift">
    <img src="../asserts/getPage/rightGift.png" alt="" class="img-right-gift">
    <img src="../asserts/getPageTelegram/inputAfterText.png" alt="" class="img-input-after-text">

    <van-cell-group inset>
      <van-field v-model="phone" placeholder="请输入手机号码" type="tel" style="font-size: 4vw;" class="phone-field" autofocus />
    </van-cell-group>

    <van-button
      color="linear-gradient(to bottom, #ffb929, #fb7421)"
      class="get-button"
      @click="getButtonClick"
    >
      点击领取
    </van-button>

    <!-- <van-checkbox v-model="checked" class="checked" icon-size="3.87vw"></van-checkbox>

    <div class="text-container">
      <span>我已阅读并同意</span>
      <span style="color: rgb(7, 212, 125);" @click="showBusiness">《业务受理协议》</span>
      <span>和</span>
      <span style="color: rgb(7, 212, 125);" @click="showSecret">《用户隐私协议》</span>
    </div> -->

    <van-dialog v-model:show="showBusinessText" width="90vw">
      <DialogTextBusiness />
    </van-dialog>

    <van-dialog v-model:show="showSecretText" width="90vw">
      <DialogTextSecretTelegram />
    </van-dialog>

    <van-dialog v-model:show="info1" width="60vw" :showConfirmButton="false" closeOnClickOverlay>
      <div style="width: 60vw; text-align: center; display: flex; flex-direction: column; font-size: 4vw; padding: 5vw 0;">
        <div>{{ infoText }}</div>
      </div>
    </van-dialog>

    <!--即将领取弹窗-->
    <van-dialog v-model:show="showPreGet" :showConfirmButton="false" closeOnClickOverlay width="80vw">
      <div style="display: flex; flex-direction: column; width: 80vw; padding: 5vw; min-height: 30vh;">
        <div style="display: flex;">
          <img src="../asserts/xIcon.png" alt="" style="width: 6vw; height: 6.67vw; margin-left: 65vw;" @click="showPreGet = false">
        </div>
        <div style="font-size: 6.25vw; font-weight: bold; margin-left: 1vw; margin-top: 3vw;">
          即将领取爱奇艺白金会员
        </div>
        <div style="display: flex;">
          <img src="../asserts/getPage/aiqiyiLogo.png" alt="" style="width: 26.27vw; height: 26vw; margin-left: 22vw; margin-top: 7vw;">
        </div>
        <div style="font-size: 4vw; color: #666; margin-left: 1vw; margin-top: 7vw;">
          领取成功后，将消耗一次本月领取资格
        </div>
        <div style="display: flex;">
          <van-button
            color="linear-gradient(to bottom, #ffb929, #fb7421)"
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

    <!--领取成功弹窗-->
    <van-dialog v-model:show="showHandleSuccess" :showConfirmButton="false" closeOnClickOverlay width="80vw">
      <div style="display: flex; flex-direction: column; width: 80vw; padding: 5vw; min-height: 30vh;">
        <div style="display: flex;">
          <img src="../asserts/xIcon.png" alt="" style="width: 6vw; height: 6.67vw; margin-left: 65vw;" @click="showHandleSuccess = false">
        </div>
        <div style="display: flex;">
          <img src="../asserts/successBackground.png" alt="" style="width: 33.33vw; height: 33.33vw; margin-left: 19vw;">
          <img src="../asserts/successCheck.png" alt="" style="width: 16.8vw; height: 17.07vw; margin-left: -25vw; margin-top: 8vw;">
        </div>
        <div style="font-size: 6.25vw; font-weight: bold; margin-left: 23vw; margin-top: 3vw;">
          领取成功
        </div>
        <div style="font-size: 3.25vw; color: #666; margin-left: 2vw; margin-top: 7vw;">
          将发送手机号码对应的爱奇艺账号请及时查收
        </div>
        <div style="display: flex;">
          <van-button
            color="linear-gradient(to bottom, #ffb929, #fb7421)"
            style="width: 48.4vw; height: 11.6vw; font-size: 5vw; border-radius: 5vw; margin-top: 3vw; margin-left: 11vw;"
            @click="showHandleSuccess = false"
          >
            知道了
          </van-button>
        </div>
      </div>
    </van-dialog>

    <!--领取失败弹窗-->
    <van-dialog v-model:show="showHandleFail" :showConfirmButton="false" closeOnClickOverlay width="80vw">
      <div style="display: flex; flex-direction: column; width: 80vw; padding: 5vw; min-height: 30vh;">
        <div style="display: flex;">
          <img src="../asserts/xIcon.png" alt="" style="width: 6vw; height: 6.67vw; margin-left: 65vw;" @click="showHandleFail = false">
        </div>
        <div style="display: flex;">
          <img src="../asserts/failBackground.png" alt="" style="width: 33.33vw; height: 33.33vw; margin-left: 19vw;">
          <img src="../asserts/failX.png" alt="" style="width: 16.8vw; height: 17.07vw; margin-left: -25vw; margin-top: 8vw;">
        </div>
        <div style="display: flex;">
          <img src="../asserts/failText.png" alt="" style="width: 24vw; height: 6.13vw; margin-left: 24vw; margin-top: 3vw;">
        </div>
        <div style="display: flex;">
          <van-button
            color="linear-gradient(to bottom, #ffb929, #fb7421)"
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
import axios from 'axios';
import DialogTextBusiness from '../components/DialogTextBusiness.vue';
import DialogTextSecretTelegram from '../components/DialogTextSecretTelegram.vue';
import { baseUrlTelegram, serveName } from '../utils/util.js';

export default {
  name: "GetPage",
  components: {
    DialogTextBusiness,
    DialogTextSecretTelegram,
  },
  data() {
    return {
      phone: "",
      getButtonLoading: false,
      getButtonDisabled: false,
      checked: false,
      showBusinessText: false, // 是否显示业务受理协议弹窗
      showSecretText: false, // 是否显示隐私协议弹窗
      showPreGet: false,
      showHandleSuccess: false,
      showHandleFail: false,
      info1: false,
      infoText: '',
    };
  },
  created() {
    document.title = "电信爱奇艺";
    this.getToken();
  },
  methods: {
    showBusiness() {
      this.showBusinessText = true;
    },
    showSecret() {
      this.showSecretText = true;
    },
    showInfo(text) {
      this.infoText = text
      this.info1 = true;
      setTimeout(() => {
        this.info1 = false;
      }, 3000);
    },
    // 获取token并存储到本地
    getToken() {
      axios.post(`${baseUrlTelegram}/oauth/oauth/token?client_id=client&client_secret=secret_881&grant_type=client_credentials`).then((res) => {
        if (res?.status === 200) {
          window.localStorage.setItem('access_token', res?.data?.access_token);
        }
      });
    },
    // 领取接口
    doGet(phone) {
      const access_token = localStorage.getItem('access_token');
      return new Promise((resolve) => {
        axios({
          method: 'POST',
          url: `${baseUrlTelegram}${serveName}/v1/0/yk-cqqy-receive-orders/action?phone=${phone}&access_token=${access_token}&agentCode=SCDX`,
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
    getButtonClick() {
      if (!this.phone) {
        this.showInfo('请先输入手机号！');
        return;
      }
      // if (!this.checked) {
      //   this.showInfo('请勾选同意相关协议！');
      //   return;
      // }
      this.showPreGet = true;
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
}
</script>

<style scoped lang="less">
  .container {
    width: 100vw;
    position: relative;
    .background {
      width: 100%; position: absolute; top: 0; left: 0;
    }
    .img-aiqiyi {
      position: absolute;
      width: 21.6vw;
      height: 2.8vw;
      top: 4.13vw;
      left: 3.6vw;
    }
    .img-china-mobile {
      position: absolute;
      width: 13.87vw;
      height: 4.27vw;
      top: 3.33vw;
      left: 26.53vw;
    }
    .img-top-text {
      position: absolute;
      width: 88.4vw;
      height: 22.8vw;
      left: 5.87vw;
      top: 13.47vw;
    }
    .img-center-text {
      position: absolute;
      width: 27.33vw;
      height: 3.2vw;
      left: 36.13vw;
      top: 89.33vw;
    }
    .img-left-gift {
      position: absolute;
      width: 10.8vw;
      height: 16.67vw;
      left: 0vw;
      top: 102.67vw;
    }
    .img-right-gift {
      position: absolute;
      width: 12.53vw;
      height: 31.6vw;
      right: 0vw;
      top: 109.2vw;
    }
    .img-input-after-text {
      position: absolute;
      width: 76.4vw;
      height: 6.67vw;
      left: 11.2vw;
      top: 123.2vw;
    }
    .img-circle-matrix {
      position: absolute;
      width: 92.8vw;
      height: 58.13vw;
      left: 3.6vw;
      top: 101.73vw;
    }
    .phone-field {
      position: absolute;
      width: 69.84vw;
      height: 10.43vw;
      left: 15.02vw;
      top: 109.17vw;
      border: 0.2vw solid #666;
      border-radius: 1vw;
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
    .checked {
      position: absolute;
      width: 3.87vw;
      height: 3.87vw;
      left: 11.3vw;
      top: 150.33vw;
    }
    .text-container {
      position: absolute;
      width: auto;
      height: auto;
      left: 16vw;
      top: 150.33vw;
      font-size: 3vw;
    }
  }
</style>