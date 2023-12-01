<template>
  <div class="container">
    <div style="width: 100%; position: absolute; top: 0; left: 0;">
      <img src="../asserts/background.png" alt="" style="width: 100%;">
    </div>
    <img src="../asserts/爱奇艺会员-logo.png" alt="" class="img-aiqiyi">
    <img src="../asserts/中国移动.png" alt="" class="img-china-mobile">
    <img src="../asserts/topText.png" alt="" class="img-top-text">
    
    <img src="../asserts/圆角矩形 10.png" alt="" class="img-circle-matrix">
    <img src="../asserts/25元 _月   合约12个月.png" alt="" class="img-circle-matrix-text-1">
    <img src="../asserts/dot.png" alt="" class="img-dot">
    <img src="../asserts/circleIcon.png" alt="" class="img-circle-icon">
    <img src="../asserts/vIcon.png" alt="" class="img-v-icon">
    <img src="../asserts/20Icon.png" alt="" class="img-20-icon">
    <img src="../asserts/gbIcon.png" alt="" class="img-gb-icon">
    <img src="../asserts/aiqiyiIcon.png" alt="" class="img-aiqiyi-icon">
    <img src="../asserts/vipIcon.png" alt="" class="img-vip-icon">
    <img src="../asserts/plusIcon.png" alt="" class="img-plus-icon-1">
    <img src="../asserts/plusIcon.png" alt="" class="img-plus-icon-2">
    <img src="../asserts/plusIcon.png" alt="" class="img-plus-icon-3">
    <img src="../asserts/matrixText1.png" alt="" class="img-matrix-text-1">
    <img src="../asserts/matrixText2.png" alt="" class="img-matrix-text-2">
    <img src="../asserts/matrixText3.png" alt="" class="img-matrix-text-3">
    <img src="../asserts/matrixText4.png" alt="" class="img-matrix-text-4">
    <img src="../asserts/matrixText5.png" alt="" class="img-matrix-text-5">
    
    <img src="../asserts/圆角矩形 11.png" alt="" class="img-circle-matrix-2">

    <van-cell-group inset class="phone-field">
      <van-field v-model="phone" placeholder="请输入手机号码" type="tel" style="font-size: 4.5vw;" autofocus />
    </van-cell-group>

    <van-cell-group inset class="sms-code-field">
      <van-field v-model="smsCode" placeholder="请输入验证码" type="digit" style="font-size: 4.5vw;" />
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

    <van-checkbox v-model="checked" class="checked" icon-size="3.87vw"></van-checkbox>

    <div class="text-container">
      <span>我已阅读并同意</span>
      <span style="color: #f77219;" @click="showBusiness">《业务受理协议》</span>
      <span>和</span>
      <span style="color: #f77219;" @click="showSecret">《用户隐私协议》</span>
    </div>

    <van-button
      color="linear-gradient(to bottom, #ffb929, #fb7421)"
      class="handle-button"
      :loading="handleButtonLoading"
      :disabled="handleButtonDisabled"
      @click="handleButtonClick"
    >
      立即办理
    </van-button>

    <van-dialog v-model:show="showBusinessText" width="90vw">
      <DialogTextBusiness />
    </van-dialog>

    <van-dialog v-model:show="showSecretText" width="90vw">
      <DialogTextSecret />
    </van-dialog>

    <van-dialog v-model:show="info1" width="60vw" :showConfirmButton="false" closeOnClickOverlay>
      <div style="width: 60vw; text-align: center; display: flex; flex-direction: column; font-size: 4vw; padding: 5vw 0;">
        <div>{{ infoText }}</div>
      </div>
    </van-dialog>

    <!--受理失败弹窗-->
    <van-dialog v-model:show="showHandleFail" :showConfirmButton="false" closeOnClickOverlay width="80vw">
      <div style="display: flex; flex-direction: column; width: 80vw; padding: 5vw; min-height: 30vh;">
        <div style="display: flex;">
          <img src="../asserts/xIcon.png" alt="" style="width: 6vw; height: 6.67vw; margin-left: 65vw;" @click="showHandleFail = false">
        </div>
        <div style="display: flex;">
          <img src="../asserts/failBackground.png" alt="" style="width: 33.33vw; height: 33.33vw; margin-left: 20vw;">
          <img src="../asserts/failX.png" alt="" style="width: 16.8vw; height: 17.07vw; margin-left: -25vw; margin-top: 8vw;">
        </div>
        <div style="display: flex;">
          <img src="../asserts/failText.png" alt="" style="width: 24vw; height: 6.13vw; margin-left: 25vw; margin-top: 3vw;">
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

    <!--受理成功弹窗-->
    <van-dialog v-model:show="showHandleSuccess" :showConfirmButton="false" closeOnClickOverlay width="80vw">
      <div style="display: flex; flex-direction: column; width: 80vw; padding: 5vw; min-height: 30vh;">
        <div style="display: flex;">
          <img src="../asserts/xIcon.png" alt="" style="width: 6vw; height: 6.67vw; margin-left: 65vw;" @click="showHandleSuccess = false">
        </div>
        <div style="display: flex;">
          <img src="../asserts/successBackground.png" alt="" style="width: 33.33vw; height: 33.33vw; margin-left: 20vw;">
          <img src="../asserts/successCheck.png" alt="" style="width: 16.8vw; height: 17.07vw; margin-left: -25vw; margin-top: 8vw;">
        </div>
        <div style="display: flex;">
          <img src="../asserts/successText.png" alt="" style="width: 24vw; height: 6.13vw; margin-left: 25vw; margin-top: 3vw;">
        </div>
        <div style="display: flex;">
          <van-button
            color="linear-gradient(to bottom, #ffb929, #fb7421)"
            style="width: 48.4vw; height: 11.6vw; font-size: 5vw; border-radius: 5vw; margin-top: 3vw; margin-left: 12vw;"
            @click="showHandleSuccess = false"
          >
            知道了
          </van-button>
        </div>
      </div>
    </van-dialog>

    <img src="../asserts/text.png" alt="" class="img-text">
  </div>
</template>

<script>
import axios from 'axios';
import DialogTextBusiness from '../components/DialogTextBusiness.vue';
import DialogTextSecret from '../components/DialogTextSecret.vue';
import { baseUrl, serveName } from '../utils/util.js';

export default {
  name: 'HandlePage',
  components: {
    DialogTextBusiness,
    DialogTextSecret,
  },
  data() {
    return {
      phone: '', // 手机号
      smsCode: '', // 验证码 
      smsButtonText: '获取验证码', // 验证码按钮文字
      checked: false,
      showBusinessText: false, // 是否显示业务受理协议弹窗
      showSecretText: false, // 是否显示隐私协议弹窗
      smsButtonLoading: false, // 验证码按钮加载中状态
      smsButtonDisabled: false, // 验证码按钮是否禁用
      handleButtonLoading: false, // 办理按钮加载中状态
      handleButtonDisabled: false, // 办理按钮是否禁用
      showHandleFail: false, // 是否显示处理失败弹窗
      showHandleSuccess: false, // 是否显示处理成功弹窗
      info1: false,
      infoText: '',
      orderId: '',
    };
  },
  created() {
    this.getToken();
  },
  methods: {
    showBusiness() {
      this.showBusinessText = true;
    },
    showSecret() {
      this.showSecretText = true;
    },
    // 获取token并存储到本地
    getToken() {
      axios.post(`${baseUrl}/oauth/oauth/token?client_id=client&client_secret=secret_881&grant_type=client_credentials`).then((res) => {
        if (res?.status === 200) {
          window.localStorage.setItem('access_token', res?.data?.access_token);
        }
      });
    },
    // 获取短信验证码接口
    getSmsCode(phone) {
      const access_token = localStorage.getItem('access_token');
      return new Promise((resolve) => {
        axios({
          method: 'POST',
          url: `${baseUrl}${serveName}/v1/0/yk-cq-quanyi-orders/external/sendSms?phone=${phone}&access_token=${access_token}`,
        }).then((res) => {
          if (res?.status === 200 && res?.data?.code === '0000') {
            this.showInfo('验证码已发送！');
            this.orderId = res?.data?.orderId;
          }
          resolve();
        }).catch(() => {
          this.showInfo('获取验证码失败，请稍后重试！');
          resolve();
        });
      });
    },

    // 立即办理接口
    doOrderAccept(phone, orderId, smsCode) {
      const access_token = localStorage.getItem('access_token');
      return new Promise((resolve) => {
        axios({
          method: 'POST',
          url: `${baseUrl}${serveName}/v1/0/yk-cq-quanyi-orders/external/orderAccept?orderId=${orderId}&phone=${phone}&smsCode=${smsCode}&access_token=${access_token}`,
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

    showInfo(text) {
      this.infoText = text
      this.info1 = true;
      setTimeout(() => {
        this.info1 = false;
      }, 3000);
    },

    // 点击验证码按钮
    async smsButtonClick() {
      if (!this.phone) {
        this.showInfo('请先输入手机号！');
        return;
      }
      this.smsButtonLoading = true;
      this.smsButtonDisabled = true;
      await this.getSmsCode(this.phone);
      this.smsButtonLoading = false;
      let countDown = 30;
      this.smsButtonText = `${countDown}秒后获取`;
      countDown --;
      const timer = setInterval(() => {
        if (countDown === 0) {
          this.smsButtonDisabled = false;
          this.smsButtonText = "获取验证码";
          clearInterval(timer);
        } else {
          this.smsButtonText = `${countDown}秒后获取`;
          countDown --;
        }
      }, 1000);
    },

    // 点击立即办理
    async handleButtonClick() {
      if (!this.phone) {
        this.showInfo('请先输入手机号！');
        return;
      }
      if (!this.smsCode) {
        this.showInfo('请先输入验证码！');
        return;
      }
      if (!this.orderId) {
        this.showInfo('请先获取验证码！');
        return;
      }
      if (!this.checked) {
        this.showInfo('请勾选同意相关协议！');
        return;
      }
      this.handleButtonDisabled = true;
      this.handleButtonLoading = true;
      await this.doOrderAccept(this.phone, this.orderId, this.smsCode);
      this.handleButtonDisabled = false;
      this.handleButtonLoading = false;
    },
  },
}
</script>

<style scoped lang="less">
  // :root:root {
  //   --van-toast-max-width: 70vw;
  //   --van-toast-font-size: 3vw;
  //   --van-toast-icon-size: 5vw;
  // }

  .container {
    width: 100vw;
    position: relative;

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
    .img-circle-matrix {
      position: absolute;
      width: 92.12vw;
      height: 76.45vw;
      left: 3.94vw;
      top: 102.67vw;
    }
    .img-circle-matrix-text-1 {
      position: absolute;
      width: 58.67vw;
      height: 6.67vw;
      left: 20.67vw;
      top: 105.2vw;
    }
    .img-dot {
      position: absolute;
      width: 1.2vw;
      height: 1.33vw;
      left: 45.07vw;
      top: 108.27vw;
    }
    .img-circle-icon {
      position: absolute;
      width: 83.97vw;
      height: 16.03vw;
      left: 8.13vw;
      top: 118.4vw;
    }
    .img-v-icon {
      position: absolute;
      width: 8.67vw;
      height: 9.6vw;
      left: 11.8vw;
      top: 121.5vw;
    }
    .img-20-icon {
      position: absolute;
      width: 8.67vw;
      height: 7.6vw;
      left: 34.18vw;
      top: 120.88vw;
    }
    .img-gb-icon {
      position: absolute;
      width: 3.6vw;
      height: 2.8vw;
      left: 36.88vw;
      top: 129.17vw;
    }
    .img-aiqiyi-icon {
      position: absolute;
      width: 8.4vw;
      height: 9.73vw;
      left: 57.33vw;
      top: 121.6vw;
    }
    .img-vip-icon {
      position: absolute;
      width: 10.8vw;
      height: 6.53vw;
      left: 78.67vw;
      top: 122.67vw;
    }
    .img-plus-icon-1 {
      position: absolute;
      width: 3.73vw;
      height: 4vw;
      left: 25.47vw;
      top: 124.53vw;
    }
    .img-plus-icon-2 {
      position: absolute;
      width: 3.73vw;
      height: 4vw;
      left: 48.53vw;
      top: 124.53vw;
    }
    .img-plus-icon-3 {
      position: absolute;
      width: 3.73vw;
      height: 4vw;
      left: 70.93vw;
      top: 124.53vw;
    }
    .img-matrix-text-1 {
      position: absolute;
      width: 14.8vw;
      height: 6.93vw;
      left: 8.93vw;
      top: 137.2vw;
    }
    .img-matrix-text-2 {
      position: absolute;
      width: 16vw;
      height: 6.8vw;
      left: 30.67vw;
      top: 137.2vw;
    }
    .img-matrix-text-3 {
      position: absolute;
      width: 14.67vw;
      height: 6.93vw;
      left: 53.6vw;
      top: 137.2vw;
    }
    .img-matrix-text-4 {
      position: absolute;
      width: 11.73vw;
      height: 6.93vw;
      left: 77.87vw;
      top: 137.2vw;
    }
    .img-matrix-text-5 {
      position: absolute;
      width: 82.4vw;
      height: 17.47vw;
      left: 8.8vw;
      top: 154.13vw;
    }
    .img-circle-matrix-2 {
      position: absolute;
      width: 92.12vw;
      height: 76.45vw;
      left: 3.94vw;
      top: 182.8vw;
    }
    .phone-field {
      position: absolute;
      width: 70.67vw;
      height: 10.53vw;
      left: 13.6vw;
      top: 190vw;
      border: 0.2vw solid #666;
    }
    .sms-code-field {
      position: absolute;
      width: 42.27vw;
      height: 10.53vw;
      left: 13.6vw;
      top: 204.8vw;
      border: 0.2vw solid #666;
    }
    .sms-code-button {
      position: absolute;
      width: 26.4vw;
      height: 10.53vw;
      left: 62vw;
      top: 204.8vw;
      font-size: 3.5vw;
    }
    .checked {
      position: absolute;
      width: 3.87vw;
      height: 3.87vw;
      left: 10.67vw;
      top: 221.07vw;
    }
    .text-container {
      position: absolute;
      width: auto;
      height: auto;
      left: 16vw;
      top: 220.8vw;
      font-size: 3vw;
    }
    .handle-button {
      position: absolute;
      width: 70.4vw;
      height: 11.6vw;
      left: 14.8vw;
      top: 233.73vw;
      font-size: 5vw;
      font-weight: bolder;
      border-radius: 5vw;
    }
    .img-text {
      position: absolute;
      width: 87.87vw;
      height: 212.8vw;
      left: 6vw;
      top: 261.87vw;
    }
  }
</style>