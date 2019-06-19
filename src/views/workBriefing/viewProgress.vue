<template>
 <!-- 进度查看 -->
    <div class="view-progress">
        
        <el-row class="view-title">
            <el-col :sm="1">
                 <i @click="$router.push('/basic/progressReport')" class="el-icon-arrow-left" style="margin-right:20px;cursor:pointer"></i>
            </el-col>
            <el-col :sm="22" :md="8">
                {{this.deptName||'--'}}
            </el-col>
            <el-col :sm="24" :md="15" class="color-border">
                <ul>
                    <li v-for="(i,value) in colors" :key="value">
                        <div :style="{ backgroundColor : i.color ,borderRadius:i.circle}"></div>
                        <span>{{i.name}}</span>
                    </li>
                </ul>
            </el-col>
        </el-row>
        <el-row class="view-main" >
            <ul>
                <li v-for="(item,index) in list" :key="index" >
                    <div class="list-div" v-if="item.planStatus">
                        <div class="triangle_border" :style="{borderColor:filter(item.planStatus)}">
                        </div>
                        <span class="triangle_text">{{item.planStatus}}</span>
                        <div class="item_main">
                            <span>{{item.workName}}</span>
                            <el-row class="item_detail">
                                    <myProgress 
                                    :myprop="item" 
                                    :status="item.planStatus">
                                    </myProgress>
                            </el-row>
                        </div>
                    </div>
                    
                </li>
            </ul>
        </el-row>
    </div>
</template>

<script>
import myProgress from '../../components/progress.vue'
import {mapState} from 'vuex'
export default {
    name:'viewProgress',
    components:{myProgress},
    data(){
        return{
            deptId:'',
            deptName:'',
            list:[],
            colors:[
                {
                    color:'#AEB5C4',
                    name:'未开始',
                    circle:'0px'
                },
                {
                    color:'#E6AB55',
                    name:'进行中',
                    circle:'0px'
                    
                },
                {
                    color:'#00BCFF',
                    name:'已完成',
                    circle:'0px'
                    
                },
                {
                    color:'#00BCFF',
                    name:'按计划完成',
                    circle:'50px'
                },
                {
                    color:'#FC6A6A',
                    name:'超时',
                    circle:'50px'
                },
                {
                    color:'#5BCA93',
                    name:'提前',
                    circle:'50px'
                },
            ]
        }
    },
    methods:{
        getDetails(){
            this.$http('get',`/workPlan/getWorkProgress?deptId=${this.deptId}`).then((response)=>{
                if(response.code==200){
                    this.list = response.data.object
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        
        filter(status){
            switch (status){
                case '未开始' :return 'transparent #AEB5C4 transparent transparent';
                case '进行中' :return 'transparent #E6AB55 transparent transparent';
                case '已完成' :return 'transparent #00BCFF transparent transparent';
                default      : return 'transparent transparent transparent transparent'
            }
        },
        //页面所有的方法写在这里
        formatter(row) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        }
    },
    computed: mapState({
        loginInfo: state => state.loginInfo.user,
    }),
    mounted(){
        this.deptId = this.$route.params.id
        this.deptName = this.$route.params.deptname
        this.getDetails()
    }
}
</script>

<style lang="less">
/* 在这里写css样式 */
/* 新建完了这个页面要去添加路由，在src/router.js里面添加，添加方法在readme里面 */
.view-progress{
    background-color: #ffffff;
    padding: 20px 10px;
    .demo-form-inline .el-input,.demo-form-inline .el-select{
    width: 130px!important;
    }
    .view-title{
        height:30px;
        line-height:30px;
        font-size:14px
    }
    .color-border{
        ul{
            display: flex;
            justify-content: flex-end;
            li{
                display:flex;
                align-items: center;
                cursor: pointer;
                color:#666666;
                div{
                    width:16px;
                    height:16px;
                    margin-left:20px;
                    margin-right:5px;
                    margin-top:-2px;
                }
            }
        }
       
    }
    .view-main{
        margin-top:10px;
        ul{
            li{
                .list-div{
                    height:182px;
                    position:relative;
                 .triangle_border{
                        width:0;
                        height:0;
                        border-width: 0 91px 78px 0;
                        border-style:solid;
                        position:absolute;
                        right: 0px;
                    }
                    .triangle_text{
                        position:absolute;
                        right: 8px;
                        color:#fff;
                        transform:rotate(40deg);
                        top:15px;
                    }
                    .item_main{
                        padding:15px;
                        .item_detail{
                            padding-top:40px;
                        }   
                    }
                }
                .list-div:nth-child(odd){
                    background-color:rgba(241,243,247,1)
                    // background-color: #000;
            }
            }
            
        }
    }
   .el-button+.el-button{
       margin-left: 0px;
       margin-top:10px
   }
    .el-button{
        padding:12px 0px;
    }
}

</style>

