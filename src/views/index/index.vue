<template>
<div class="index">
  <el-row class="bar">
    <!-- <el-col :span="17">
      <el-button type="primary" size="small">Excel模版下载</el-button>
      <el-button type="primary" size="small">Excel数据导入</el-button>
    </el-col> -->
    <el-col :offset="17" :span="5">
      <el-input v-model="input" size="small" placeholder="请输入社保账号查询" clearable></el-input>
    </el-col>
    <el-col :span="2" style="text-align:right">
      <el-button v-if="input" type="primary" size="small" @click="getOne">查询</el-button>
      <el-button v-else type="primary" size="small" @click="init">查看全部</el-button>
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
    <!-- <el-table-column
      prop="bankOutletsPic"
      label="网点图片"
      width="120">
       <template slot-scope="scope">
        <el-button @click="viewpic(scope.row.id)">查看图片</el-button>
      </template>
    </el-table-column> -->
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
// import { Base64 } from 'js-base64';

export default {
  name: "index",
  data() {
    return {
      showPic:false,
      picbase64:'',
      tableData: [],
      currentPage: 1,
      input:'',
      total:0,
      pageSize:10
    };
  },
  methods: {
    viewpic(id){
       this.$http("get", `/info?id=${id}`).then(data => {
          if(data.code==200){
          this.picbase64 = data.data.bankOutletsPic
          this.showPic = true
          }else{
            this.$message.warning('获取失败')
          }
        });

    },
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
    },
    getOne(){
        this.$http("get", `/info?id=${this.input}`).then(data => {
          if(data.code==200){
          this.tableData = [data.data];
          }else{
            this.$message.warning(data.msg)
          }
        });
    }
  },
  created() {
    
  },
  mounted() {
    this.init();
  }
};
</script>