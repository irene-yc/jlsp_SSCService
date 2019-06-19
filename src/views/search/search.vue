<template>
 <!-- 工作计划 -->
    <div class="special-audit">
      <el-row>
        <div class="title">
          社保查询
        </div>
      </el-row>
      <el-row class="searchBox">
        <el-col :span="20">
          <el-input v-model="auditName" placeholder="请输入社会保障号码（即身份证号）"></el-input>
        </el-col>
        <el-col :span="4">
           <el-button type="primary" @click="searchHandle">
          搜索
          </el-button>
        </el-col>
      </el-row>
      <table v-if="search">
        <tr>
          <td>社会保障号码:</td>
          <td>xxxxxxxxxxxxxxxxxxxxx</td>
        </tr>
         <tr>
          <td>姓名:</td>
          <td>xxxxxxxxxxxxxxxxxxxxx</td>
        </tr>
         <tr>
          <td>所属银行:</td>
          <td>xxxxxxxxxxxxxxxxxxxxx</td>
        </tr>
         <tr>
          <td>银行服务网点:</td>
          <td>xxxxxxxxxxxxxxxxxxxxx</td>
        </tr>
         <tr>
          <td>网点地址:</td>
          <td>xxxxxxxxxxxxxxxxxxxxx</td>
        </tr>
         <tr>
          <td>咨询电话:</td>
          <td>xxxxxxxxxxxxxxxxxxxxx</td>
        </tr>
      </table>
        <!-- <div style="border:1px solid red; width:700px;">
          <el-steps :active="1">
            <el-step title="步骤 1" description="a?"></el-step>
            <el-step title="步骤 2" description="b?"></el-step>
            <el-step title="步骤 3" description="这段就没那么长了"></el-step>
          </el-steps>
        </div> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'specialAudit',
    data(){
        return{
        search:false,
        auditName:'',
        tableData: [{
          id:'220303195209023430',
          name:'艾成学',
          service:'中国农业银行股份有限公司铁东支行',
          bank:'农业银行',
          address:'四平市铁东区中央东路1251号',
          phone:'028-1234567',
        }]
      }
    },
    computed: mapState({
        loginInfo: state => state.loginInfo.user,
    }),
    mounted(){
    },
    methods:{
      searchHandle(){
        this.search = true;
      }
    },
    
}
</script>

<style lang="less">
/* 在这里写css样式 */
/* 新建完了这个页面要去添加路由，在src/router.js里面添加，添加方法在readme里面 */
.special-audit{
    width: 50%;
    margin: 150px auto;
    background-color: #ffffff;
    padding: 20px 20px;
    border-radius: 5px;
}
.searchBox{
  width: 80%;
  margin: 40px auto;
}
.title{
  font-size: 24px;
  margin-top: 10px;
}
html,body{
  background-color: #2296e8;
}
table{
  width: 80%;
  margin: 0 auto;
  color: #4e4444;
  tr td:nth-child(1){
    text-align: right;
    padding: 10px 0;
  }
  tr td:nth-child(2){
    text-align: left;
    padding: 10px;
  }
}
</style>

