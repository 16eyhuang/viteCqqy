<template>
  <!-- <div style="height: 70vh; overflow: scroll; margin-top: 10vh;">
    <el-table
      :data="data"
      stripe
      border
      height="90vh"
    >
      <el-table-column prop="orderDate" label="下单时间" width="170" />
      <el-table-column prop="mobile" label="手机号" width="120" />
      <el-table-column prop="orderMonth" label="权益月份" width="90" />
      <el-table-column prop="dlOrderNo" label="订单号" width="290" />
      <el-table-column prop="orderFlag" label="领取标识" width="90" />
      <el-table-column prop="receiveDate" label="领取时间" width="170" />
      <el-table-column prop="itemDesc" label="产品描述" width="200" />
    </el-table>
  </div> -->
  <van-search
    v-model="mobile"
    placeholder="请输入手机号"
    @search="queryTableData"
    @cancel="onCancel"
  />
  <el-table
    :data="data"
    stripe
    border
    height="90vh"
  >
    <el-table-column prop="orderDate" label="下单时间" width="170" />
    <el-table-column prop="mobile" label="手机号" width="120" />
    <el-table-column prop="orderMonth" label="权益月份" width="90" />
    <el-table-column prop="dlOrderNo" label="订单号" width="290" />
    <el-table-column prop="orderFlag" label="领取标识" width="90" />
    <el-table-column prop="receiveDate" label="领取时间" width="170" />
    <el-table-column prop="itemDesc" label="产品描述" width="200" />
  </el-table>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { baseUrlTelegram, serveName } from '../utils/util.js';

const columns = [
  {
    key: 'orderDate',
    dataKey: 'orderDate',
    title: '下单时间',
    width: 150,
  },
  {
    key: 'mobile',
    dataKey: 'mobile',
    title: '手机号',
    width: 110,
  },
  {
    key: 'orderMonth',
    dataKey: 'orderMonth',
    title: '权益月份',
    width: 80,
  },
  {
    key: 'dlOrderNo',
    dataKey: 'dlOrderNo',
    title: '订单号',
    width: 270,
  },
  {
    key: 'orderFlag',
    dataKey: 'orderFlag',
    title: '领取标识',
    width: 80,
  },
  {
    key: 'receiveDate',
    dataKey: 'receiveDate',
    title: '领取时间',
    width: 150,
  },
  {
    key: 'itemDesc',
    dataKey: 'itemDesc',
    title: '产品描述',
    width: 250,
  },
];

export default {
  name: "BenefitReport",
  data() {
    return {
      tableHeight: 844,
      tableWidth: columns.reduce((pre, cur) => pre + cur, 0),
      columns,
      data: [],
      mobile: '',
      token: '',
    };
  },
  created() {
    document.title = "权益领取查询";
    this.getToken();
    window.addEventListener("resize", () => {
      this.resetTableHeight();
    });
  },
  methods: {
    // 获取token
    getToken() {
      axios.post(`${baseUrlTelegram}/oauth/oauth/token?client_id=client&client_secret=secret_881&grant_type=client_credentials`).then((res) => {
        if (res?.status === 200) {
          this.token = res?.data?.access_token;
        }
      });
    },
    resetTableHeight() {
      this.tableHeight = Math.max(window.outerHeight, 500);
    },
    queryTableData() {
      if (!this.mobile) {
        ElMessage('请输入手机号!');
        return;
      }
      axios({
        method: 'GET',
        url: `${baseUrlTelegram}${serveName}/v1/0/yk-cqqy-receive-orders/query?access_token=${this.token}&mobile=${this.mobile}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then((res) => {
        if (res.data.length === 0) {
          ElMessage('未查询到数据！');
        }
        this.data = res.data;
      });
    },
  },
}
</script>

