<template>
 <!-- 运维信息 -->
    <div class="opsInfo">
        <div class="mytitle">
                    <img src="../../assets/line_red.png">
                    <h4>
                        安全结论
                    </h4>
                </div>
        <div>
        <div class="mycontent">
            <div class="my-title">
                    <img src="../../assets/line_red.png">
                    <h5>
                        漏洞级别
                    </h5>
                </div>
                <div class="level">
                    <div class="level-squre">
                        <div class="warningpic">
                            <img src="../../assets/danger.png" style="width:25px">
                        </div>
                        <div class="warningcon" style="background-color:#DF4236">
                            <p>高危漏洞</p>
                            <span>1</span>
                        </div>
                    </div>
                    <div class="level-squre">
                        <div class="warningpic" style="background-color:#DF7C0F">
                            <img src="../../assets/danger.png" style="width:25px">
                        </div>
                        <div class="warningcon" style="background-color:#FB8D12">
                            <p>中危漏洞</p>
                            <span>2</span>
                        </div>
                    </div>
                    <div class="level-squre">
                        <div class="warningpic" style="background-color:#81469F">
                            <img src="../../assets/danger.png" style="width:25px">
                        </div>
                        <div class="warningcon" style="background-color:#9154B1">
                            <p>低危漏洞</p>
                            <span>20</span>
                        </div>
                    </div>
                </div>
                <div class="my-title">
                    <img src="../../assets/line_red.png">
                    <h5>
                        漏洞类型
                    </h5>
                </div>
                <div style="height:300px;" class="echarts">
                    
                </div>
        </div>
            <div>
                <el-table
                    ref="singleTable"
                    :data="tableData"
                    highlight-current-row
                    style="width: 100%;
                        margin-bottom: 40px;
                    "
                    >
                        <el-table-column
                        label="系统名称"
                        property="name"
                        align='center'

                        >
                        </el-table-column>
                        <el-table-column
                        property="time"
                        align='center'
                        label="提测时间">
                        </el-table-column>
                        <el-table-column
                        property="status"   
                        align='center'
                        label="提测状态">
                        </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
// import { stringify } from 'querystring';
// import { formatDate } from '../../util/date.js';
export default {
    name:'opsInfo',
    data(){
        return{
            tableData: [
                {
                    name:'应用系统支撑',
                    time:'2019-6-1 10：00',
                    status:'已完成'
                },
                {
                    name:'党建模型管理',
                    time:'2019-6-1 10：00',
                    status:'已完成'
                },
                {
                    name:'党建管理系统',
                    time:'2019-6-1 10：00',
                    status:'已完成'
                },
                {
                    name:'党员干部学习系统',
                    time:'2019-6-1 10：00',
                    status:'已完成'
                },
                {
                    name:'党建信息交互系统',
                    time:'2019-6-1 10：00',
                    status:'已完成'
                },
                {
                    name:'党员志愿服务系统',
                    time:'2019-6-1 10：00',
                    status:'已完成'
                },
                {
                    name:'大数据人才管理系统',
                    time:'2019-6-1 10：00',
                    status:'已完成'
                },
                {
                    name:'组织工作信息收集系统',
                    time:'2019-6-1 10：00',
                    status:'已完成'
                },
                {
                    name:'党员积分激励系统',
                    time:'2019-6-1 10：00',
                    status:'已完成'
                },
                {
                    name:'党建数据融合分析系统',
                    time:'2019-6-1 10：00',
                    status:'已完成'
                },
            ],
            dialogVisible:false,
            maintenance:true,
            dialogFormVisible: false,
            updateForm: {
                // systemName:'',
                valueTime:[],
                infoStatus:'',
                period:'',
                periodUnit:'',
                cost:'',
                costSource:'',
                companyName:'',
                contactName:'',
                contactPhone:'',
                isSecret:'',
                stopTime:'',
                model:'',
                stopReason:'',
                },
            formLabelWidth: '200px',
            value1: '',
            radio:1,
            dialogupdateVisible:false,
            pageSize:10
            }
    },
    mounted(){
        // this.id = this.$route.params.id
        // this.getData();//一定要在这里调用
        // this.getList()
        // this.getModel()
        // this.getBasicInfo()
        this.initChart()
    },
    methods:{
        initChart() {
            echarts.dispose(document.querySelector(".echarts"));
            const chart = echarts.init(document.querySelector(".echarts"));
            chart.setOption({
                    color: ['#6CADF0'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        top:'5%',
                        left: '2%',
                        right: '2%',
                        bottom: '0%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['权限漏洞', '静态漏洞'],
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                margin:15,
                                interval: 0,
                                rotate: 20,
                            },
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name:'漏洞（个）',
                            nameLocation:'middle',
                            nameGap:35
                        }
                    ],
                    series : [
                        {
                            name:'漏洞',
                            type:'bar',
                            barWidth: '10%',
                            data:[220,400]
                        }
                    ]
            });
        },
    },
}
</script>

<style lang="less">
.opsInfo{
    background-color: #e6ebef;
    .el-dialog__body{
        padding:0
    }
    .mytitle{
            margin-top:-20px;
            display: flex;
            align-items: center;
            padding: 15px;
            img{
                height: 30px;
            }
            h4{
                margin-left: 10px;
            }   
    }
    .mycontent{
            .my-title{
                display: flex;
                align-items: center;
                padding: 15px;
                img{
                    height: 20px;
                }
                h5{
                    margin-left: 10px;
                }   
            }
            .level{
                height:50px;
                display:flex;
                .level-squre{
                    width:200px;
                    height:100%;
                    display:flex;
                    margin-left:20px;
                    .warningpic{
                        width:50px;
                        height:100%;
                        background-color:#CF362C;
                        display:flex;
                        justify-content:center;
                        align-items:center
                    }
                    .warningcon{
                        width:150px;
                        height:100%;
                        display:flex;
                        flex-direction:column;
                        align-items:center;
                        color:#fff;
                        justify-content:center;
                        p{
                            font-size:13px
                        }
                    }
                }
            }
    }
}
.opsInfo > div>div{
    padding: 0 10px;

    background-color: #ffffff;
}
.opsInfo > div>div:nth-child(1){
    margin-bottom: 15px;
    padding: 15px;
}
.demo-form-inline .el-input,.demo-form-inline .el-select{
    width: 130px!important;
}
.zanwei{
    width: 100%;
    height: 15px;
    background-color: #E8ECF0;
}
.opsInfo .el-form-item{
    margin-bottom: 0
}
.demoDialog .el-input,.demoDialog .el-range-editor.el-input__inner{
    width: 250px;
}
.demoDialog .el-form-item{
    margin: 10px 0
}
.demoDialog .el-form-item__label{
    width: 150px!important;
}
.lineLabel .el-form-item__label{
    line-height: 15px;
}
.textareaW .el-textarea{
  width: 640px;
}
.dialog-footer{
    text-align: right;
}
.inside_title{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height:40px;
    background:#f2f2f2;
    margin-top:10px;
    font-size:20px;
    line-height:40px;
    padding-left: 20px;
}
.modal_table{
    padding:20px 30px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    tr{
        height:40px;
        td{
            width:220px;
            margin-left:10px;
            padding-left:10px;
        }
        td:nth-child(odd){
            width:150px;
            font-size: 15px;
            font-weight: 400;
            text-align: right;
            padding-left:0px;
        }
    }
}
.sec_select{
    .el-select .el-input__inner:focus{
        width:120px;
    }
    .demoDialog .el-input, .demoDialog .el-range-editor.el-input__inner{
        width:120px!important;
    }
    .el-input--small .el-input__inner{
        width:120px;
    }
    .el-input,.el-input--small,.el-input--suffix{
        width:120px !important;

    }
}
/* 在这里写css样式 */
/* 新建完了这个页面要去添加路由，在src/router.js里面添加，添加方法在readme里面 */
</style>

