<template>
 <!-- 运维信息 -->
    <div class="opsInfo">
        <div>
            <div>
                 <i @click="$router.push('/basic/systemBasic')" class="el-icon-arrow-left" style="margin-right:20px;cursor:pointer"></i>

                <el-button type="primary" @click="dialogFormVisible = true" size="small">填报运维信息</el-button>                
            </div>
            <div>
                <el-table
                    ref="singleTable"
                    :data="tableData"
                    highlight-current-row
                    style="width: 100%"
                    >
                    <el-table-column
                    label="序号"
                    type="index"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    property="createTime"
                    label="填报时间">
                    </el-table-column>
                    <el-table-column
                    property="period"
                    label="本周运维时间">
                    <template slot-scope="scope">
                        <div v-if="scope.row.periodStart&&scope.row.periodEnd">
                            {{scope.row.periodStart}}至{{scope.row.periodEnd}}
                        </div>
                        <div v-else>--</div>
                    </template>
                    </el-table-column>

                    <el-table-column
                    property="companyName"
                    label="运维单位">
                    <template slot-scope="scope">
                        <div v-if="scope.row.companyName">
                            {{scope.row.companyName}}
                        </div>
                        <div v-else>--</div>
                    </template>
                    </el-table-column>
                    <el-table-column
                    property="cost"
                    label="运维费用">
                    <template slot-scope="scope">
                        <div v-if="scope.row.cost">
                            {{scope.row.cost}}元
                        </div>
                        <div v-else>--</div>
                    </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="180">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看运维信息</el-button>
                            <el-button type="text" size="small" @click="isDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 新增运维信息 -->
                <el-dialog title="新增运维信息" :visible.sync="dialogFormVisible" class="demoDialog"  width="900px">
                    <el-form :inline="true" :model="updateForm">
                         <el-form-item label="系统状态" :label-width="formLabelWidth">
                            <el-select v-model="updateForm.infoStatus" disabled size="small">
                                <el-option v-for="i in statusList" :label="i.name" :value="i.value" :key="i.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="运维周期" :min="0" :label-width="formLabelWidth" class="sec_select">
                            <!-- <el-input v-model="updateForm.period" style="width:100px" size="small" ></el-input> -->
                            <el-input-number :min="0" v-model="updateForm.period" :step="1" style="width:120px" size="small"></el-input-number>
                            <el-select  v-model="updateForm.periodUnit" size="small" style="width:100px" >
                                <el-option label="年" value="Y" ></el-option>
                                <el-option label="月" value="M" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="本周期运维时间" :label-width="formLabelWidth">
                            <el-date-picker
                                v-model="updateForm.valueTime"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>   
                        </el-form-item>
                        <el-form-item label="运维模式" :label-width="formLabelWidth">
                            <el-select v-model="updateForm.model" placeholder="请选择运维模式" size="small">
                                <el-option  v-for="i in allModal" :label="i.dictName" :value="i.id" :key="i.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="运维费用" :label-width="formLabelWidth">
                            <el-input-number v-model="updateForm.cost" :precision="2" :step="100" :min="0" size="small" style="width:250px;"></el-input-number>元
                            <!-- <el-input v-model="updateForm.cost" placeholder="请输入运维费用" autocomplete="off" size="small"></el-input> -->
                        </el-form-item>
                        <el-form-item label="运维费来源" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.costSource" placeholder="请输入运维费来源" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="运维单位名称" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.companyName" placeholder="请输入运维单位名称" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="运维单位联系人" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.contactName" placeholder="请输入运维单位联系人" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="运维单位联系电话" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.contactPhone" placeholder="请输入运维单位联系电话" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                         <el-form-item label="与运维单位是否签订运维保密协议" :label-width="formLabelWidth" class="lineLabel">
                                <el-radio v-model="updateForm.isSecret" label="Y">是</el-radio>
                                <el-radio v-model="updateForm.isSecret" label="N">否</el-radio>
                        </el-form-item>
                        <el-form-item label="暂停使用时间" :label-width="formLabelWidth">
                            <!-- <el-input v-model="updateForm.stopTime" placeholder="请输入暂停使用时间" autocomplete="off" size="small"></el-input>
                             -->
                             <el-date-picker
                            v-model="updateForm.stopTime"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="暂停使用原因" :label-width="formLabelWidth" class="textareaW">
                            <el-input v-model="updateForm.stopReason" placeholder="请输入暂停使用原因" autocomplete="off"  type="textarea" :rows="2" size="small"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                        <el-button type="primary" @click="onSave" size="small" style="margin-left:30px;">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 查看 -->
                    <el-dialog 
                    append-to-body 
                    title="查看运维信息" 
                    :visible.sync="innerVisible" 
                    width="900px">
                    <table class="modal_table">
                        <tr>
                            <td>系统状态</td>
                            <td>{{updateForm.infoStatus|status}}</td>
                            <td>运维周期</td>
                            <td>{{nowMessage.period||'--'}}</td>
                        </tr>
                        <tr>
                            <td>本周期运维时间</td>
                            <td>{{nowMessage.periodStart||'--'}}至{{nowMessage.periodEnd||'--'}}</td>
                            <td>运维模式</td>
                            <td>{{changeModelNumToText(nowMessage.model)||'--'}}</td>
                        </tr>
                        <tr>
                            <td>运维费用</td>
                            <td>{{nowMessage.cost||'--'}}</td>
                            <td>运维费来源</td>
                            <td>{{nowMessage.costSource||'--'}}</td>
                        </tr>
                        <tr>
                            <td>运维单位名称</td>
                            <td>{{nowMessage.companyName||'--'}}</td>
                            <td>运维单位联系人</td>
                            <td>{{nowMessage.contactName||'--'}}</td>
                        </tr>
                        <tr>
                            <td>运维单位联系电话</td>
                            <td>{{nowMessage.contactPhone||'--'}}</td>
                            <td>与运维单位是否签订运维保密协议</td>
                            <td v-if="nowMessage.isSecret=='Y'">是</td>
                            <td v-else-if="nowMessage.isSecret=='N'">否</td>
                            <td v-else>--</td>
                        </tr>
                        <tr>
                            <td v-if="nowMessage.infoStatus == '暂停使用'">暂停使用时间</td>
                            <td v-else>终止使用时间</td>
                            <td>{{nowMessage.stopTime||'--'}}</td>
                        </tr>
                        <tr>
                            <td v-if="nowMessage.infoStatus == '暂停使用'">暂停使用原因</td>
                            <td v-else>终止使用原因</td>                            
                            <td>{{nowMessage.stopReason||'--'}}</td>
                        </tr>
                    </table>
                    </el-dialog>

            </div>
            <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="changePage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { stringify } from 'querystring';
import { formatDate } from '../../util/date.js';
export default {
    name:'opsInfo',
    data(){
        return{
            infoStatus:'',
            statusList:[
            {
                name:'--',
                value:-1
            },
            {
                name:'正在运行',
                value:0
            },
            {
                name:'暂停使用',
                value:1
            },
            {
                name:'终止使用',
                value:2
            }
        ],
            allModal:[],
            id:'',
            innerVisible:false,
            nowMessage:{},
            formInline: {
                belongNetwork:'',
                status:null,
                systemName:'',
                systemStatus:null,
            },
            networkTypes:[],
            current:1,
            total:1,
            tableData: [],
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
            dialogupdateVisible:false
            }
    },
    filters:{
        status(index){
            switch(index){
                case 0: return '正在运行';
                case 1: return '暂停使用';
                case 2: return '终止使用';
                default : return '--'
            }
        }
    },
    mounted(){
        this.id = this.$route.params.id
        this.getData();//一定要在这里调用
        this.getList()
        this.getModel()
        this.getBasicInfo()
    },
    methods:{
        
        //页面所有的方法写在这里
        changePage(index){
          //清空
          this.tableData = []
          this.current = index
          this.getData()
        },
        changeModelNumToText(num){
            let a = ''
            this.allModal.forEach(item=>{
                if(num===item.id){
                    a = item.dictName
                }
            })
            return a 
        },
        onSave(){
            if(!this.updateForm.period){
                this.$message.warning('请输入运维周期')
                return
            }else if(!this.updateForm.periodUnit){
                this.$message.warning('请输入运维周期后的单位')
                return
            }else if(!this.updateForm.valueTime.length){
                this.$message.warning('请输入运维时间')
                return
            }else if(!this.updateForm.model){
                this.$message.warning('请输入运维模式')
                 
                return
            }else if(!this.updateForm.cost){
                this.$message.warning('请输入运维费用')
                return
            }else if(!this.updateForm.costSource){
                this.$message.warning('请输入运维费来源')
                return
            }else if(!this.updateForm.companyName){
                this.$message.warning('请输入运维单位名称')
                return
            }else if(!this.updateForm.contactName){
                this.$message.warning('请输入运维单位联系人')
                return
            }else if(!this.updateForm.contactPhone){
                this.$message.warning('请输入运维单位电话')
                return
            }else if(!this.updateForm.isSecret){
                this.$message.warning('请选择是否签订保密协议')
                return
            }else if(!this.updateForm.stopTime){
                this.$message.warning('请选择暂停时间')
                return
            }
            let infoOper = this.updateForm
            infoOper.periodStart = formatDate(this.updateForm.valueTime[0], 'yyyy-MM-dd hh:mm:ss');
            infoOper.periodEnd = formatDate(this.updateForm.valueTime[1], 'yyyy-MM-dd hh:mm:ss');
            infoOper.stopTime = formatDate(infoOper.stopTime, 'yyyy-MM-dd hh:mm:ss');
            this.$http('post',`/infoOper/save`,{
                ...infoOper,
                infoId:this.id
            }).then(res=>{
                console.log(infoOper,res)
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.dialogFormVisible = false
                    // 保存后modal框全部清空，仅保留状态
                    this.updateForm = {}
                    this.updateForm.infoStatus = this.infoStatus
                    this.updateForm.valueTime =[]
                    this.getData()
                }else{
                    this.$message.warning(res.msg)
                }
            })
        },
        getModel(){ 
            this.$http('get','/dict/getOperModelList').then(res=>{
                console.log(res)
                this.allModal = res.data.list || []
            })
        },
        okDelete(id){
            this.$http('post',`/infoOper/delete/${id}`).then(res=>{
                if(res.code==200){
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getData()
                }else{
                    this.$message({
                    type: 'warning',
                    message: res.msg
                });
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        isDelete(id){
            this.$confirm('此操作将删除该运维信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.okDelete(id)
            
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消删除'
            });          
            });
        },
        networkTypeChange(index){
            let name = ''
            this.networkTypes.forEach(item=>{
                if(item.id == index){
                    name = item.dictName
                }
            })
            return name
        },
        getBasicInfo(){
            this.$http('get',`/infoBasic/info/${this.id}`).then(res=>{
                 this.updateForm.infoStatus = res.data.object.systemStatus
                 this.infoStatus = res.data.object.systemStatus
                //  console.log()
            })
        },
        getData(){
            // 初始列表
            let obj = {
                infoId:this.id,
                currentPage:this.current,
                pageSize:10
            }
            this.$http("get", `/infoOper/list?${stringify(obj)}`).then(data => {
                console.log(data.data.page.records)
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
            this.getData()
        },
        handleClick(id) {
            this.$http('get',`/infoOper/info/${id}`).then(res=>{
                 this.nowMessage = res.data.object
                console.log(this.nowMessage)
            })
            this.innerVisible = true;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(()=> {
                done();
            })
            .catch(()=> {});
        }
    },

}
</script>

<style lang="less">
.opsInfo{
    background-color: #e6ebef;
    .el-dialog__body{
        padding:0
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
    text-align: center;
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

