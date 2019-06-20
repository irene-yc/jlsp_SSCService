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
          <el-input v-model="id" placeholder="请输入身份证号"></el-input>
        </div>
        <div>
          <el-button type="primary" @click="searchHandle">查 询</el-button>
        </div>
      </el-row>
      <table v-if="search">
        <tr>
          <td>社会保障号码:</td>
          <td>{{list.id}}</td>
        </tr>
         <tr>
          <td>姓名:</td>
          <td>{{list.name}}</td>
        </tr>
         <tr>
          <td>所属银行:</td>
          <td>{{list.bankName}}</td>
        </tr>
         <tr>
          <td>银行服务网点:</td>
          <td>{{list.bankOutlets}}</td>
        </tr>
         <tr>
          <td>网点地址:</td>
          <td>{{list.bankOutletsAddress}}</td>
        </tr>
         <tr>
          <td>咨询电话:</td>
          <td>{{list.advicePhone}}</td>
        </tr>
      </table>
      <div v-if="searchT" class="error">
        <span style="color:red">{{msg}}</span>
      </div>
      <div v-if="search" class="esc">
          <el-button type="primary" @click="escOut" size="small">退 出</el-button>
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
        searchT:false,
        id:'',
        list:{
          advicePhone: "",
          bankName: " ",
          bankOutlets: "",
          bankOutletsAddress: "",
          id: "",
          msg:''
        }
      }
    },
    computed: mapState({
        loginInfo: state => state.loginInfo.user,
    }),
    mounted(){
    },
    methods:{
      searchHandle(){
        if(this.id != ''){
          this.$http("get", "/info",{id:this.id}).then(data => {
            if(data.code==200){
                this.search = true;
                this.searchT = false;
                this.list = data.data;
            }else{
              this.searchT = true;
              this.search = false;
              this.msg = data.msg;
            }
          });
        }else{
            this.$message({
                type: 'warning',
                message: '请输入您的身份证号码'
            });     
        }
      },
      escOut(){
        this.list = {
          advicePhone: "",
          bankName: " ",
          bankOutlets: "",
          bankOutletsAddress: "",
          id: "",
        }
        this.search = false;
      }
    },
    
}
</script>

<style lang="less">
/* 在这里写css样式 */
/* 新建完了这个页面要去添加路由，在src/router.js里面添加，添加方法在readme里面 */
.special-audit{
    width: 50%;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 20px 20px;
    border-radius: 5px;
    position: relative;
    top: 120px;
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
html{
  // background-color: #2296e8;
  background-color: #000;
  background: url('../../assets/images/timg.jpeg') no-repeat;
  background-size: 100% 100%;
}
body{
  background-color: transparent;
}
table{
  width: 80%;
  margin: 0 auto;
  color: #4e4444;
  tr td:nth-child(1){
    text-align: right;
    padding: 10px 0;
    width: 150px;
    font-weight: bold;
  }
  tr td:nth-child(2){
    text-align: left;
    padding: 10px;
    font-size: 14px;
  }
}
.error{
  padding: 0 0 30px 0;
}
.esc{
  margin: 10px 0;
}
@media (max-width: 500px){
    html,body{
        background: #000;
        background-color: #2296e8;
        background-image: none;
    }
    .special-audit{
      top: 0;
      width: 90%;
      margin: 30px auto;
      padding: 0
    }
    .searchBox{
      width: 90%;
      margin: 20px auto;
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
      tr td:nth-child(1){
        width: 80px;
        font-size: 14px;
      }
      tr td:nth-child(2){
        width: 90px;
        font-size: 12px;
      }
    }
    .esc button{
      width: 90%;
      margin: 20px 0;
    }
}
</style>

