<template>
<div class="index">
  <!-- <el-row class="bar">
    <el-col :span="17">
      <el-button type="primary" size="small">Excel模版下载</el-button>
      <el-button type="primary" size="small">Excel数据导入</el-button>
    </el-col>
    <el-col :offset="17" :span="5">
      <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="2" style="text-align:right">
      <el-button type="primary" size="small">查询</el-button>
    </el-col>
  </el-row> -->
  <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:20px;">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="id"
      label="社会保障号码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="bankName"
      label="所属银行"
      width="120">
    </el-table-column>
    <el-table-column
      prop="bankOutlets"
      label="银行服务网点"
      width="200">
    </el-table-column>
    <el-table-column
      prop="bankOutletsAddress"
      label="网点地址"
    >
    </el-table-column>
    <el-table-column
      prop="advicePhone"
      label="咨询电话"
      width="120">
    </el-table-column>
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
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
      tableData: [],
      currentPage: 1,
      input:'',
      total:0,
      pageSize:10
    };
  },
  methods: {
    init(){
          this.$http("get", "/list",{currentPage:this.currentPage,pageSize:this.pageSize}).then(data => {
          this.tableData = data.data.records;
          this.currentPage = data.data.current;
          this.total = data.data.total;
          this.pageSize = data.data.size;
        });
    },
    handleClick(row) {
        console.log(row);
    },
    handleSizeChange(val) {
     this.pageSize = val;
     this.currentPage = 1;
     this.init()      
    },
    handleCurrentChange(val) {
     this.currentPage = val;
     console.log(this.pageSize)
     this.init()
    }
  },
  created() {
    
  },
  mounted() {
    this.init();
  }
};
</script>