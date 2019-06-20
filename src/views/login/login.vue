<template>
<div class="login-style">
    <div class="login-top">
        <img src="../../assets/images/login/logo1.png">
        <h1>
            {{systemShowName?systemShowName:'四平市社会保障卡信息查询服务后台管理系统'}}
        </h1>
    </div>
    <div class="login-bottom">
         <el-tabs value="content">
            <el-tab-pane label="账户密码登录" name="content" class="login-main">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                    <el-form-item prop="account">
                        <el-input type="primary" prefix-icon="el-icon-search" v-model.trim="ruleForm.account" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" prefix-icon="el-icon-search" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="verify">
                        <el-input type="primary" @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.verify" autocomplete="off" style="width:150px;margin-right:40px"></el-input>
                        <div  style="height:40px;width:160px">
                          <img :src="codeSrc" alt="点击刷新图片" style="height:40px;width:160px" @click="refreshVerify">
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" class="button-login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</div>

</template>
<style lang="less">
.login-style{
    background: #f0f2f5;
    .el-form-item__content{
      display: flex;
    }
    .login-top{
        width: 100%;
        display:flex;
        align-items: center;
        justify-content: center;
        height:342px;
        color:#fff;
        background: #4197F4 url(../../assets/images/login/login_background.png) no-repeat center 20px;
        img{
            width:50px;
            margin-right: 20px;
        }

    }
    .login-bottom{
        min-height:300px;
        display: flex;
        justify-content: center;
        background: #e7ecf0;
        .login-main{
            width:360px;
            margin-top:10px;
        }
        .button-login{
            width:100%;
            margin-top:20px;
        }
    }
    .el-tabs__nav-scroll{
        display:flex;
        justify-content: center;
    }
    .el-tabs__nav-wrap::after{
        background-color:#f0f2f5;
    }
    .el-tabs__item.is-active{
        font-size: 16px;
    }
    .el-tabs__nav is-top{
        width:128px!important;
    }
    .el-tabs__active-bar is-top{
        width:128px!important;
    }
    
}

</style>

<script>
import Md5 from 'md5';
export default {
  name: "login",
  data() {
      var validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
    return {
      ruleForm: {
          account: '',
          password: '',
          verify:'',
        },
        rules: {
          account: [
            { validator: validateAccount, trigger: 'blur' }
          ],
          password: [
            { validator: validatePwd, trigger: 'blur' }
          ],
           verify: [
            { required: true,message:'请输入验证码', trigger: 'blur' }
          ],
        },
        systemShowName:'',
        codeSrc:'',
    };
  },
  methods: {
    refreshVerify(){
      this.codeSrc = ''
      let This = this
      setTimeout(() => {
        This.codeSrc = "/validateCode/captcha.jpg?t="+new Date()
      }, 51);
    },
    refreshCode() {
    //  this.$http("get", "/validateCode/captcha.jpg?t="+new Date()).then(data => {
    //    data?this.codeSrc = data : this.codeSrc = ''
    //  });
    this.codeSrc = "/validateCode/captcha.jpg?t="+new Date()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //先验证验证码
          this.$http("post", `/validateCode/validate/${this.ruleForm.verify}`).then((res)=>{
            if(res.code==200){
                this.$http("post", "/login",{
                    "userName":this.ruleForm.account,
                    "password":Md5(this.ruleForm.password)
                }).then(response => {
                if(response.code==200){
                    this.$message.success('登录成功')
                    this.$store.commit('setUserInfo',response.data)
                    this.$router.push('/')
                }else{
                    this.$message.warning(response.msg)
                }
                }).catch((err)=>{
                    this.$message.warning(err.data.msg)
                    this.refreshCode()
                })
            }else{
                this.$message.warning(res.msg)
                this.refreshCode()

            }
          })
        
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    
      //在实例创建完成后被立即调用
      this.refreshCode();
  },
  mounted() {
    //  this.$http("get", "/sys/getSystemShowName").then(data => {
    //    this.systemShowName = data.data.object.systemShowName
    //     this.$store.commit('setSystemShowName',data.data.object);
    //  });
  }
};
</script>