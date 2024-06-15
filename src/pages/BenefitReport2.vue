<template>
  <el-table-v2
    :columns="columns"
    :data="data"
    :width="1000"
    :height="500"
    fixed
  />
</template>

<script>
import axios from 'axios';
import { baseUrl, serveName } from '../utils/util.js';

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
    };
  },
  created() {
    document.title = "移动爱奇艺";
    this.queryTableData();
    window.addEventListener("resize", () => {
      this.resetTableHeight();
    });
  },
  methods: {
    // 获取token并存储到本地
    getToken() {
      axios.post(`${baseUrl}/oauth/oauth/token?client_id=client&client_secret=secret_881&grant_type=client_credentials`).then((res) => {
        if (res?.status === 200) {
          window.localStorage.setItem('access_token', res?.data?.access_token);
        }
      });
    },
    resetTableHeight() {
      this.tableHeight = Math.max(window.outerHeight, 500);
    },
    queryTableData() {
      axios.post(`${baseUrl}/oauth/oauth/token?client_id=client&client_secret=secret_881&grant_type=client_credentials`).then((result) => {
        axios({
          method: 'GET',
          url: `${baseUrl}${serveName}/v1/0/yk-cqqy-receive-orders/query`,
          headers: {
            Authorization: `Bearer ${result?.data?.access_token}`,
          },
        }).then((res) => {
          console.log('res: ', res);
          this.data = res.data;
        });
      });
    },
  },
}
</script>

