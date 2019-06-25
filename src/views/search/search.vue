<template>
 <!-- 工作计划 -->
 <div class="main">
    <div class="special-audit">
      <el-row>
        <div class="title">
          社会保障卡信息查询
        </div>
      </el-row>
      <el-row class="searchBox">
        <div>
          <!-- <el-input v-model="ruleForm.id" placeholder="请输入身份证号"></el-input> -->
          <el-form  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item  prop="id">
              <el-input @keyup.enter.native="searchHandle" v-model="ruleForm.id" placeholder="请输入身份证号" autocomplete="off" clearable></el-input>
            </el-form-item>
            <!-- 当表单中只有一项时，enter会造成自动提交而刷新页面，所以新增一个项将其隐藏，制造成两项的情况 -->
            <el-form-item>
              <el-input id="hiddenText" type="text" style="display:none"> </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button type="primary"  @click="searchHandle">查 询</el-button>
        </div>
      </el-row>
      <table v-if="search">
        <tr>
          <td>社会保障号码:</td>
          <td>{{list.id}}</td>
        </tr>
         <!-- <tr>
          <td>姓名:</td>
          <td>{{list.name}}</td>
        </tr> -->
         <tr>
          <td>银行服务网点:</td>
          <td>{{list.bankOutlets}}<a @click="viewpic(list.bankOutletsPic)" style="margin-left:10px;cursor:pointer;color:blue">查看</a> </td>
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
      <div v-if="search" style="margin-top:20px;" class="error">
        <p>请持卡人携带有效身份证件到以上指定银行网点领卡。代领卡需由代领人携带本人和被代领人有效身份证原件到以上指定银行网点领卡。</p>
      </div>

      <div v-if="searchT" class="error">
        <span style="color:red">{{msg}}</span>
      </div>
      <div v-if="search" class="esc">
          <el-button type="primary" @click="escOut" size="small">退 出</el-button>
      </div>
    </div>
    <el-dialog
      title="查看图片"
      :visible.sync="showPic"
      width="80%">
      <div >
        <img :src="'data:image/png;base64,'+list.bankOutletsPic" style="width:100%">
      </div>
    </el-dialog>
      <div id='footer'>
        <div class="copyright clearfix">
          <div class="dz">   
              <h6  style="display:flex;align-items:center">	
              <span id="_ideConac"><a href="//bszs.conac.cn/sitename?method=show&amp;id=16F2FD608B973E2DE053022819AC76E8" target="_blank"><img id="imgConac" vspace="0" hspace="0" border="0" src="//dcs.conac.cn/image/red.png" data-bd-imgshare-binded="1"></a></span><span id="_ideConac"></span>
              <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=22030202000017" target="_blank" class="baa"> <img src="../../assets/images/gh1_1.png"> </a>
              </h6>
            <div class="clear"></div>
            <h6><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=22030202000017" target="_blank" style="font-size:14px">吉公网安备 22030202000017号</a></h6>         		
          </div>            	
          <div class="ms"> 
                    <p>四平市人民政府主办  四平市人民政府办公室承办</p>
                    <p><a href="http://www.beian.miit.gov.cn/" target="_blank">吉ICP备11005874号</a>&nbsp;网站标识码&nbsp;2203000001
                  </p>
            <p><span> 四平市政府门户网站 </span>中文域名：四平市人民政府.政务</p>
                      <p>四平市人民政府市民服务热线：0434-12345 </p>
                    <p>四平市政府门户网站技术服务中心&nbsp; 联系电话：0434-3266258 </p>
                  
                    <p><span id="cnzz_stat_icon_1272818459"><a href="https://www.cnzz.com/stat/website.php?web_id=1272818459" target="_blank" title="站长统计"><img border="0" hspace="0" vspace="0" src="http://icon.cnzz.com/img/pic1.gif"></a></span></p>
          </div>
          <div class="jc">
            <div class="pic_link">
              <a style="display:block;width:220px; height:63px; float:left;margin-right:10px;" href="http://report.12377.cn:13225/toreportinputNormal_anis.do" target="_blank">
              <img style=" width:100%; height:100%;" src="../../assets/images/jbzx_14.png">
              </a>
              <p class="copyright_a">
                <span id="_span_jiucuo">
                <img @click="Link('2203000001')" style="margin:0;border:0;cursor: pointer;" src="http://pucha.kaipuyun.cn/exposure/images/jiucuo.png?v=2203000001"></span>
              </p>
            </div>
              
              <ul>
                  <li><a href="http://www.siping.gov.cn/wzdt/" target="_blank">网站地图</a>｜</li>
                  <li><a href="http://www.siping.gov.cn/gywm/" target="_blank">关于我们</a>｜</li>
                  <li><a href="http://www.siping.gov.cn/wztg/" target="_blank">网站通告</a></li>
              </ul>
          </div>
      </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { setTimeout } from 'timers';
export default {
    name:'specialAudit',
    data(){
        var validateId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入身份证号码'));
        } else {
          var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
          if(reg.test(value) === false)  
            {  
                callback(new Error('身份证输入不合法'));
            }  
          callback();
        }
      };
        return{
        showPic:false,
        rules: {
          id: [
            { validator: validateId, trigger: 'blur' }
          ]
        },
        fullHeight: document.documentElement.clientHeight,
        timer:null,
        search:false,
        searchT:false,
        ruleForm:{id:''},
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
      document.getElementById('footer').className = 'search-foot1'
    },
    watch: {
      search(val){
        if(val){
          document.getElementById('footer').className = 'search-foot'
        }else{
          document.getElementById('footer').className = 'search-foot1'
        }
      }
    },
    methods:{
      viewpic(){
        this.showPic = true
    },
      searchHandle(){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$http("get", "/info",{id:this.ruleForm.id}).then(data => {
              if(data.code==200){
                // 置空计时器
                  clearTimeout(this.timer)
          
                  this.search = true;
                  this.searchT = false;
                  this.list = data.data;
                  // 1分钟后关闭且清空显示内容
                  this.timer = setTimeout(()=>{
                    this.list = {
                      advicePhone: "",
                      bankName: " ",
                      bankOutlets: "",
                      bankOutletsAddress: "",
                      id: "",
                    }
                    this.ruleForm.id = ''
                    this.search = false;
                    this.showPic=false

                  },60000)
              }else{
                this.searchT = true;
                this.search = false;
                this.msg = data.msg;
              }
            });
          } else {
            this.$message({
                type: 'warning',
                message: '请输入正确的身份证'
            });     
            return false;
          }
        });
      },
      Link(code){
        window.location.href=`http://121.43.68.40/exposure/jiucuo.html?site_code=${code}`
      },
      escOut(){
        this.list = {
          advicePhone: "",
          bankName: " ",
          bankOutlets: "",
          bankOutletsAddress: "",
          id: "",
        }
        this.ruleForm.id = ''
        this.search = false;
        this.showPic=false
      }
    },
    
}
</script>

<style lang="less">
/* 在这里写css样式 */
/* 新建完了这个页面要去添加路由，在src/router.js里面添加，添加方法在readme里面 */
.main{
  
  min-height:100%;
  position: relative;
  a{
    color:#60636d;
    text-decoration:none
  }
  .search-foot{
    background:#fff;
    width:100%;
    margin-top:360px;
    position: relative;
    border:1px solid #fff;
  }
   .search-foot1{
    background:#fff;
    width:100%;
    position: absolute;
    bottom: 0px;
  }
  .dz{
        text-align: center;
        width:20%;
        min-width: 145px;
        margin-top:20px;
  }
  .copyright {
    display:flex;
    justify-content: space-around;
    width: 75%;
    min-width: 660px;
    margin: 50px auto;
    position: relative;
    overflow: hidden;
    .ms{
          // padding-left: 125px;
          font-size: 12px;
          display: block;
          margin-top: 20px;
          text-align: center;
        width:30%;
        min-width: 290px;


          p{
          line-height: 25px;
        text-align: center;

          }
    }
    .jc{
          margin-top:20px;
          width: 30%;
          min-width: 220px;
          text-align: center;
          .pic_link{
            display:flex;
            flex-wrap:wrap;
            justify-content:center;
          }
          ul{
                list-style: none;
                width: 100%;
                 display: flex;
                 justify-content: center;
                 margin-top:40px;
                 li{
                   font-size: 14px;

                 }
          }

    }
    .clearfix:after {
      content: ".";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
  }


}
}
.special-audit{
    width: 50%;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 20px 20px;
    border-radius: 5px;
    position:relative;
    top:120px;
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
  text-align:center;
  font-size: 24px;
  margin-top: 10px;
}
html{
  background-color: #2296e8;
  background-color: #000;
  background: url('../../assets/images/timg.jpeg') fixed no-repeat;
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
  text-align: center;
  display: flex;
  justify-content: center;  
  p{
    width: 90%;
    color:red;
    font-size: 14px;
  }
}
.esc{
  margin: 10px 0;
  display: flex;
  justify-content: flex-end
}
@media (max-width: 500px){
  #footer{
    display: none
  }
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
         margin: 20px 0;
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
    .esc{
      justify-content: center;
    }
    .esc button{
      width: 90%;
      margin: 20px 0;
    }
    .error span{
      font-size: 12px;
    }
    .error p{
      font-size: 12px;
    }
}
</style>

