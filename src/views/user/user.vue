<template>
 <!-- 信息系统基本情况 -->
    <div class="user-style">
        <div v-if="maintenance">
            <div>
                <el-button type="primary" @click="initadd" size="mini"><i class="el-icon-circle-plus-outline" style="margin-right:5px"></i>新增用户</el-button>
                <el-table
                    ref="singleTable"
                    :data="tableData"
                    highlight-current-row
                    style="width: 100%;margin-top:20px"
                    border
                    >
                    <el-table-column
                    label="序号"
                    type="index"
                    align='center'
                    width="50"
                    >
                    </el-table-column>
                    <el-table-column
                    property="username"
                    label="用户名"
                    align='center'

                    >
                    </el-table-column>
                    <el-table-column
                    property="nickname"
                    label="昵称"
                    align='center'

                    >
                    </el-table-column>
                    <el-table-column
                    property="phone"
                    label="手机号"
                    align='center'
                    >
                    </el-table-column>
                    
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button @click="editInfo = true,modalTitle='修改信息',nowUser = scope.row" type="text" size="small">修改信息</el-button>
                            <el-button type="text" @click="ifdel(scope.row.id)" size="small">删除用户</el-button>
                            <el-button @click="editInfo = true,modalTitle='修改密码',nowUser = scope.row" type="text" size="small">密码修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="添加用户" :visible.sync="dialogFormVisible" class="demoDialog"  width="500px">
                    <el-form :inline="true" ref="ruleAdd" :model="userInfo" :rules="addUserRules">
                        <el-form-item label="账户" prop="username" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.username"></el-input>
                        </el-form-item>
                         <el-form-item label="昵称" prop="nickname" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.nickname"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.phone" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                        <el-button type="primary" @click="addUser" size="small" style="margin-left:30px;">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog :title="modalTitle" :visible.sync="editInfo" class="demoDialog"  width="500px" @close="getData">
                    <el-form :inline="true" ref="rulechange" :model="userInfo"  style="padding-top:20px">
                         <el-form-item label="昵称" prop="nickname" v-if="modalTitle=='修改信息'" :label-width="formLabelWidth">
                            <el-input v-model="nowUser.nickname"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="phone" v-if="modalTitle=='修改信息'" :label-width="formLabelWidth">
                            <el-input v-model="nowUser.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password"  v-if="modalTitle=='修改密码'" :label-width="formLabelWidth">
                            <el-input v-model="nowUser.password" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="editInfo = false" size="small">取 消</el-button>
                        <el-button type="primary" @click="editUser" size="small" style="margin-left:30px;">确 定</el-button>
                    </div>
                </el-dialog>
                 <el-pagination
                @size-change="handleSizeChange"
                @current-change="changePage"
                :current-page="current"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
            </div>
            
        </div>
    </div>
</template>

<script>
import Md5 from 'md5';
import { stringify } from 'querystring';
import { formatDate } from '../../util/date.js';
export default {
    name:'user',
    data(){
        return{
        nowUser:{},
        pageSize:10,
        editInfo:false,
        modalTitle:'',
        userInfo:{
            username:"",
            nickname:"",
            password:"",
            phone:"",
        },
        addUserRules:{
            username:[
                { required: true, message: '请输入账户', trigger: 'change' },
            ],
            nickname:[
                { required: true, message: '请输入昵称', trigger: 'change' },
            ],
            password:[
                { required: true, message: '请输入密码', trigger: 'change' },
            ],
        },
            current:1,
            total:1,
            tableData: [],
            dialogVisible:false,
            maintenance:true,
            dialogFormVisible: false,
            formLabelWidth: '200px',
            }
    },
    filters:{
        spliceTimeString(index){
           return index.substring(0,10)
        }
    },
    mounted(){
        // this.routeId = this.$route.params.id
        // if(this.routeId){
        //     this.updateDetails(this.routeId)
        // }
        this.getData();
    },
    methods:{
        editUser(){
            let pwd = ''
             this.nowUser.password?pwd = Md5(this.nowUser.password) :''
             this.$http("post", `/user/update`,{
                        ...this.nowUser,
                        password:pwd || null
                     }).then(data => {
                        if(data.code==200){
                            this.$message.success(data.msg)
                            this.editInfo = false
                            this.getData()
                        }else{
                            this.$message.warning(data.msg)
                        }
                    });
        },
        initadd(){
            this.userInfo={
                            id:"",
                            nickname:"",
                            password:"",
                            phone:"",
                        },
            this.dialogFormVisible = true
        },
        delUser(id){
            this.$http("post", `/user/deleteOne`,{
                        id
                     }).then(data => {
                        if(data.code==200){
                            this.$message.success(data.msg)
                            this.getData()
                        }else{
                            this.$message.warning(data.msg)
                        }
                    });
        },
        ifdel(id){
            this.$confirm('确定删除用户吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.delUser(id)
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        addUser(){
            this.$refs['ruleAdd'].validate((valid) => {
                 if(valid){
                     this.$http("post", `/user/create`,{
                         ...this.userInfo,
                        password:Md5(this.userInfo.password)
                     }).then(data => {
                        console.log(data)
                        if(data.code==200){
                            this.$message.success(data.msg)
                            this.dialogFormVisible = false
                            this.getData()
                        }else{
                            this.$message.warning(data.msg)
                        }
                    });
                 }else{
                        this.$message.warning('请先完成必填内容')

                 }
            })
        },
        changePage(index){
          //清空
          this.tableData = []
          this.current = index
          this.getData() 
        },
        handleSizeChange(val) {
         this.pageSize = val
         this.current = 1
         this.getData()
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
        updateDetails(id){
            this.$http('get',`/infoBasic/info/${id}`).then(res=>{
                 this.updateForm = res.data.object
            })

            this.dialogupdateVisible = true
        },
        getData(){
            // 初始列表
            let obj = {
                // ...this.formInline,
                currentPage:this.current,
                pageSize:this.pageSize,
                }
            this.$http("get", `/user/list?${stringify(obj)}`).then(data => {
                console.log(data)
                if(data.code==200){
                    this.tableData = data.data.records
                    this.total = data.data.total
                }
            });
            
        },
        handleClick(id) {
            this.$http('get',`/infoBasic/info/${id}`).then(res=>{
                 this.nowRow = res.data.object
            })
            this.dialogVisible = true;
        },
    },
    
}
</script>

<style lang="less">
.user-style{
    background-color: #e6ebef;
    .el-dialog__body{
        padding:0
    }
}
.user-style > div>div{
    padding: 0 10px;
    background-color: #ffffff;
}
.user-style > div>div:nth-child(1){
    margin-bottom: 15px;
    padding: 15px;
}
.demo-form-inline .el-input,.demo-form-inline .el-select{
    width: 130px!important;
}
.user-style .el-form-item{
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
</style>

