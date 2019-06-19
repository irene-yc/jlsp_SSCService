<template>
 <!-- 信息系统基本情况 -->
    <div class="systemBasic">
        <div v-if="maintenance">
            <div class="system_main">
                <div class="title">
                    <img src="../../assets/line_red.png">
                    <h4>
                        CPU占用率
                    </h4>
                </div>
                <div class="content1">

                </div>
            </div>
             <div class="system_main">
                <div class="title">
                    <img src="../../assets/line_red.png">
                    <h4>
                        并发用户数
                    </h4>
                </div>
                <div class="content2">

                </div>
            </div>
             <div class="system_main">
                <div class="title">
                    <img src="../../assets/line_red.png">
                    <h4>
                        响应时间
                    </h4>
                </div>
                <div class="content3">

                </div>
            </div>
             <div class="system_main">
                <div class="title">
                    <img src="../../assets/line_red.png">
                    <h4>
                        系统上线时间统计
                    </h4>
                </div>
                <div class="content4">

                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
import { stringify } from 'querystring';
import { formatDate } from '../../util/date.js';
export default {
    name:'systemBasic',
    data(){
        return{
            maintenance:true,
            }
    },
    filters:{
        spliceTimeString(index){
           return index.substring(0,10)
        },
        status(index){
            switch(index){
                case 0: return '正在运行';
                case 1: return '暂停使用';
                case 2: return '终止使用';
                default : return '--'
            }
        },
        periodUnit(index){
            switch(index){
                case 'Y': return '年';
                case 'M': return '月';
                default : return '--'
            }
        }
    },
    mounted(){
        // this.getDept()
        // this.getList()
        // this.getModel()
        // this.getcoverList()
        // this.getFrequenceList()
        // this.getExistModelList()
        // this.routeId = this.$route.params.id
        // if(this.routeId){
        //     this.updateDetails(this.routeId)
        // }
        // this.getData();//一定要在这里调用
        this.initChart()
    },
    methods:{
    initChart() {
      echarts.dispose(document.querySelector(".content1"));
      const chart = echarts.init(document.querySelector(".content1"));
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
                    data : ['应用支撑系统', '党建模型管理', '党建管理系统', '党员干部学习系统', '党建信息交互统', '党员志愿服务系统', '大数据人才管理系统','大数据人才管理系统','党员积分激励系统','党建数据融合分析系统'],
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
                    name:'CPU占用（%）',
                    nameLocation:'middle',
                    nameGap:25
                }
            ],
            series : [
                {
                    name:'CPU占用率',
                    type:'bar',
                    barWidth: '40%',
                    data:[12, 16, 18, 16, 20, 16, 26,14,22,12]
                }
            ]
      });

      echarts.dispose(document.querySelector(".content2"));
      const chart2 = echarts.init(document.querySelector(".content2"));
      chart2.setOption({
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
                    data : ['应用支撑系统', '党建模型管理', '党建管理系统', '党员干部学习系统', '党建信息交互统', '党员志愿服务系统', '大数据人才管理系统','大数据人才管理系统','党员积分激励系统','党建数据融合分析系统'],
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
                    name:'并发用户数（千）',
                    nameLocation:'middle',
                    nameGap:25
                }
            ],
            series : [
                {
                    name:'并发用户数',
                    type:'bar',
                    barWidth: '40%',
                    data:[6, 12, 11, 12, 16, 12, 16,14,14,6]
                }
            ]
      });


      echarts.dispose(document.querySelector(".content3"));
      const chart3 = echarts.init(document.querySelector(".content3"));
      chart3.setOption({
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
                    data : ['应用支撑系统', '党建模型管理', '党建管理系统', '党员干部学习系统', '党建信息交互统', '党员志愿服务系统', '大数据人才管理系统','大数据人才管理系统','党员积分激励系统','党建数据融合分析系统'],
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
                    name:'响应时间（ms）',
                    nameLocation:'middle',
                    nameGap:40
                }
            ],
            series : [
                {
                    name:'响应时间',
                    type:'bar',
                    barWidth: '40%',
                    data:[200,400,300,360,510,430,270,340,310,290]
                }
            ]
      });


      echarts.dispose(document.querySelector(".content4"));
      const chart4 = echarts.init(document.querySelector(".content4"));
      chart4.setOption({
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
                    data : ['应用支撑系统', '党建模型管理', '党建管理系统', '党员干部学习系统', '党建信息交互统', '党员志愿服务系统', '大数据人才管理系统','大数据人才管理系统','党员积分激励系统','党建数据融合分析系统'],
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
                    name:'统计时间（天）',
                    nameLocation:'middle',
                    nameGap:45
                }
            ],
            series : [
                {
                    name:'系统上线时间',
                    type:'bar',
                    barWidth: '40%',
                    data:[1080,1080,1080,1080,1080,1080, 720,720,720,720]
                }
            ]
      });
    },
        handleSizeChange(val) {
            this.pageSize= val;
            this.getData();
        },
        //页面所有的方法写在这里
        changeModelNumToText(num){
            let a = ''
            this.allModal.forEach(item=>{
                if(num===item.id){
                    a = item.dictName
                }
            })
            return a 
        },
        ExistModelChange(index){
            if(index){
                let arr = index.split(",")
                let name = []
                this.allExistModelList.forEach(item=>{
                    arr.forEach(i=>{
                        if(i==item.id){
                            name.push(item.dictName)
                        }
                    })
                })
                return name.join(',')
            }else{
                return '--'
            }
        },
        coverTypeChange(index){
            let name = ''
            this.allCoverList.forEach(item=>{
                if(item.id == index){
                    name = item.dictName
                }
            })
            return name
        },
        requenceListTypeChange(index){
            let frequence = ''
            this.allFrequenceList.forEach(item=>{
                if(item.id == index){
                    frequence = item.dictName
                }
            })
            return frequence
        },
        changePage(index){
          //清空
          this.tableData = []
          this.current = index
          this.getData()
        },
        column_class({row}){
            if(row.status==1&&row.systemStatus==2){
                return 'grey_Line'
            }else{
                return ''
            }
        },
        getFrequenceList(){
            this.$http('get','/dict/getUpdateFrequenceList').then(res=>{
                this.allFrequenceList= res.data.list || []
            })
        },
        getExistModelList(){
            this.$http('get','/dict/getExistModelList').then(res=>{
                this.allExistModelList= res.data.list || []
            })
        },
        onok(formName){
             this.$refs[formName].validate((valid) => {
                if (valid && this.existModel.length>0) {
                    let obj = this.updateForm
                    obj.existModel = this.existModel.join(',')
                    obj.onlineTime = formatDate(obj.onlineTime, 'yyyy-MM-dd hh:mm:ss');
                    this.$http('post','/infoBasic/submit',{
                        ...obj
                    }).then(res=>{
                        if(res.code==200){
                            this.$message.success(res.msg)
                            this.dialogupdateVisible = false
                            this.getData()
                        }else{
                            this.$message.warning(res.msg)
                        }
                    })
                } else {
                    this.$message.warning('提交表格时需要先完成表格')
                    return false;
                }
                });

        },
        onOpsOk(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    if(!this.updateForm.periodUnit){
                        this.$message.warning('请输入运维周期后的单位')
                        return false
                    }
                    //表单验证成功后发起请求
                     let infoOper = this.opsForm
                    infoOper.periodStart = formatDate(this.valueTime[0], 'yyyy-MM-dd hh:mm:ss');
                    infoOper.periodEnd = formatDate(this.valueTime[1], 'yyyy-MM-dd hh:mm:ss');
                    infoOper.stopTime = formatDate(infoOper.stopTime, 'yyyy-MM-dd hh:mm:ss');
                    this.$http('post',`/infoOper/save`,{
                        ...infoOper,
                        infoId:this.nowId,
                        infoStatus:this.opsstatus
                    }).then(res=>{
                        if(res.code==200){
                            this.$message.success(res.msg)
                            this.dialogFormVisible = false
                            // 保存后modal框全部清空，仅保留状态
                            this.opsForm = {}
                            this.valueTime =[]
                            //成功后，再调用修改状态按钮，将状态改成2，终止使用
                                this.$http('post','/infoBasic/update',{
                                    systemStatus:2,
                                    id:this.nowId
                                }).then(res=>{
                                    if(res.code==200){
                                        this.$message.success(res.msg)
                                        this.getData()
                                    }else{
                                        this.$message.warning(res.msg)
                                    }
                                })
                        }else{
                            this.$message.warning(res.msg)
                        }
                    })
                } else {
                    this.$message.warning('提交时需要先完成表格')
                    return false;
                }
            });
        },
        saveStatus(status,id){
            if(status==2){
                this.$confirm('信息系统终止使用，请填写“终止使用”运维信息后，以确认终止使用。', '提示', {
                confirmButtonText: '去填写',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.nowId = id
                    // this.$http('get',`/infoBasic/info/${id}`).then(res=>{
                        // this.opsstatus = res.data.object.systemStatus
                        this.dialogFormVisible = true
                    // })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消修改'
                    });  
                    this.getData()
                });
            }else{
                 this.$http('post','/infoBasic/update',{
                    systemStatus:status,
                    id
                }).then(res=>{
                    if(res.code==200){
                        this.$message.success(res.msg)
                    }else{
                        this.$message.warning(res.msg)
                    }
                })
            }
           
        },
        onsave(){
            let obj = this.updateForm
            obj.existModel = this.existModel.join(',')
            obj.onlineTime = formatDate(obj.onlineTime, 'yyyy-MM-dd hh:mm:ss');
            this.$http('post','/infoBasic/save',{
                ...obj
            }).then(res=>{
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.dialogupdateVisible = false
                    this.getData()
                }else{
                    this.$message.warning(res.msg)
                }
            })
        },
        getcoverList(){
            this.$http('get','/dict/getCoverScopeList').then(res=>{
                this.allCoverList= res.data.list || []
            })
        },
        getDept(){
          //获取主管部门
            this.$http("get", "/dept/getDeptTreeList").then(data => {
                // 为级联组件添加children
                this.DeptTreeList = data.data.list;
            })
        },
        getModel(){ 
            this.$http('get','/dict/getOperModelList').then(res=>{
                this.allModal= res.data.list || []
            })
        },
        updateDetails(id){
            this.$http('get',`/infoBasic/info/${id}`).then(res=>{
                 this.updateForm = res.data.object
                 if(this.updateForm.belongNetwork.indexOf("专网") != -1){
                        this.isproNetwork = true
                    }else{
                        this.isproNetwork = false
                    }
            })
            
            this.dialogupdateVisible = true
        },
        
        getData(){
            // 初始列表
            let obj = {
                ...this.formInline,
                currentPage:this.current,
                pageSize:this.pageSize,
                id:this.routeId||null
                }
            obj.deptId = [obj.deptId[obj.deptId.length-1]]
            this.$http("get", `/infoBasic/list?${stringify(obj)}`).then(data => {
                if(data.code==200){
                    this.tableData = data.data.page.records
                    this.total = data.data.page.total
                }
            });
            
        },
        getList(){
            this.$http("get", `/dict/getBelongSystemList`).then(data => {
                if(data.code==200){
                    this.networkTypes = data.data.list
                }
            });
        },
        onSubmit() {
            // console.log('submit!');
            this.current = 1
            this.getData()
        },
        handleClick(id) {
            this.$http('get',`/infoBasic/info/${id}`).then(res=>{
                 this.nowRow = res.data.object
                 if(this.nowRow.belongNetwork.indexOf('专网')!=-1){
                     this.showIsproNetwork = true
                 }else{
                     this.showIsproNetwork = false
                 }
            })
            this.dialogVisible = true;
        },
        handleinnerClick(id){
            this.$http('get',`/infoOper/info/${id}`).then(res=>{
                 this.nowMessage = res.data.object
            })
            this.innerVisible = true
        },  
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(()=> {
                done();
            })
            .catch(()=> {});
        },
    },
    
}
</script>

<style lang="less">
.systemBasic{
    background-color: #e6ebef;
    .el-dialog__body{
        padding:0
    }
    .system_main{
            margin-bottom: 15px;

        .title{
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
        .content1,.content2,.content3,.content4{
            height:250px;
        }
    }
}
.systemBasic > div>div{
    padding: 0 10px;
    background-color: #fff;
}
/* 在这里写css样式 */
/* 新建完了这个页面要去添加路由，在src/router.js里面添加，添加方法在readme里面 */
</style>

