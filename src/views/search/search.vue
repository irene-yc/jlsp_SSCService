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
      <div class="search-foot">
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
              <a style="display:block;width:220px; height:63px;float:left; margin-right:10px;" href="http://report.12377.cn:13225/toreportinputNormal_anis.do" target="_blank"><img style=" width:100%; height:100%;" src="../../assets/images/jbzx_14.png"></a>
                <p class="copyright_a"><span id="_span_jiucuo"><img @click="Link('2203000001')" style="margin:0;border:0;cursor: pointer;" src="http://pucha.kaipuyun.cn/exposure/images/jiucuo.png?v=2203000001"></span></p>
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
import { setTimeout } from 'timers';
export default {
    name:'specialAudit',
    data(){
        return{
        timer:null,
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
    watch:{
      timer(val){
        console.log(val)
      },
      search(val){
        console.log(val)
      }

    },
    methods:{
      searchHandle(){
        if(this.id != ''){
          this.$http("get", "/info",{id:this.id}).then(data => {
            if(data.code==200){
              // 置空计时器
              // debugger
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
                  this.id = ''
                  this.search = false;
                },6000)
                console.log(this.timer,'>>>>>>>>>>')
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
        this.id = ''
        this.search = false;
      }
    },
    
}
</script>

<style lang="less">
/* 在这里写css样式 */
/* 新建完了这个页面要去添加路由，在src/router.js里面添加，添加方法在readme里面 */
.main{
  min-height:100%;
  position:relative
  a{
    color:#60636d;
    text-decoration:none
  }
  .search-foot{
    position:absolute;
    bottom:0;
    // margin-top:350px;
    background:#fff;
    width:100%;
    // height:280px;
    // border:1px solid #ccc;
    
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
          // display:flex;
          // flex-direction: column;
          // align-items: center;
          // justify-content: center;
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
  // border:1px solid red;
  text-align: center;
}
.esc{
  margin: 10px 0;
  display: flex;
  justify-content: flex-end
}
@media (max-width: 500px){
  .search-foot{
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
}
</style>

