<template>
<div class="index">
  <el-row class="bar">
    <el-col :span="17">
      <el-button type="primary" size="small">Excel模版下载</el-button>
      <el-button type="primary" size="small">Excel数据导入</el-button>
    </el-col>
    <el-col :span="5">
      <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="2" style="text-align:right">
      <el-button type="primary" size="small">查询</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:20px;">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="date"
      label="社会保障号码"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="所属银行"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="银行服务网点"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="网点地址"
    >
    </el-table-column>
    <el-table-column
      prop="zip"
      label="咨询电话"
      width="120">
    </el-table-column>
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage4"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400">
  </el-pagination>
</div>
</template>
<style lang="less">
    .index{
      background-color: #ffffff;
      padding: 10px;
    }
    .bar{
      margin: 10px 0;
    }
</style>

<script>
export default {
  name: "index",
  data() {
    return {
      tableData: [{
          date: 'xxxxxxxxxxxxxxxxx',
          name: 'xxxxxxx',
          province: 'xxxxxxx',
          city: 'xxxxxxx',
          address: 'xxxxxxxxxxxxxxxxxxxxxxxx',
          zip: 200333
        }, {
          date: 'xxxxxxxxxxxxxxxxx',
          name: 'xxxxxxx',
          province: 'xxxxxxx',
          city: 'xxxxxxx',
          address: 'xxxxxxxxxxxxxxxxxxxxxxxx',
          zip: 200333
        }, {
          date: 'xxxxxxxxxxxxxxxxx',
          name: 'xxxxxxx',
          province: 'xxxxxxx',
          city: 'xxxxxxx',
          address: 'xxxxxxxxxxxxxxxxxxxxxxxx',
          zip: 200333
        }, {
          date: 'xxxxxxxxxxxxxxxxx',
          name: 'xxxxxxx',
          province: 'xxxxxxx',
          city: 'xxxxxxx',
          address: 'xxxxxxxxxxxxxxxxxxxxxxxx',
          zip: 200333
        }],
        currentPage4: 4,
        input:''
    };
  },
  methods: {
    handleClick(row) {
        console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    
  },
  mounted() {
     
  }
};
</script>