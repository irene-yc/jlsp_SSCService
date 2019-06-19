<template>
 <!-- 工作计划 -->
    <div class="special-audit">
      <el-row>
        <div class="title">
          社会保障卡信息查询
        </div>
      </el-row>
      <el-row class="searchBox">
        <div>
          <el-input v-model="auditName" placeholder="请输入身份证号"></el-input>
        </div>
        <div>
           <el-button type="primary" @click="searchHandle">
          查 询
          </el-button>
        </div>
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
      <div v-if="!search" class="error">
        <span>您当前的制卡进度为：到达省卡中心！<br/>您的信息待采集，请到四平市政务大厅办理信息采集</span>
      </div>
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
    .search-handle{
        display:flex;
        align-items:center
    }
    .table_style{
      width: 100%;
      margin-top:20px
    }
    // .demo-form-inline .el-input,.demo-form-inline .el-select{
    // width: 130px!important;
    // }
}
.searchBox{
  width: 80%;
  margin: 40px auto;
  display: flex;
    div:nth-child(1){
      flex: 1
    }
    div:nth-child(2){
      padding-left: 20px;
    }
}
.title{
  font-size: 24px;
  margin-top: 10px;
}
html,body{
  // background-color: #2296e8;
  background-color: #000;
  background: url('../../assets/images/timg.jpeg') no-repeat;
  background-size: 100% 100%;
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
.error{
  padding: 0 0 30px 0;
}
@media (max-width: 500px){
    html,body{
        background: #000;
        background-color: #2296e8;
        background-image: none;
    }
    .special-audit{
      width: 90%;
      margin: 30px auto;
      padding: 0
    }
    .searchBox{
      width: 90%;
      margin: 40px auto;
      display: block;
      div:nth-child(2){
       padding: 0; 
       button{
         margin-top: 20px;
        width: 100%;
      }
      }
    }
    table{
      width: 100%;
    }
}
</style>

