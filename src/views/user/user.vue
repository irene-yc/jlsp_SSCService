<template>
 <!-- 信息系统基本情况 -->
    <div class="user-style">
        <div v-if="maintenance">
            <div>
                <el-button type="primary" @click="dialogFormVisible = true" size="mini"><i class="el-icon-circle-plus-outline" style="margin-right:5px"></i>新增用户</el-button>
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
                    property="id"
                    label="账户"
                    align='center'

                    >
                    </el-table-column>
                    <el-table-column
                    property="name"
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
                            <el-button @click="editInfo = true,modalTitle='修改信息'" type="text" size="small">修改信息</el-button>
                            <el-button type="text" @click="ifdel(scope.row.id)" size="small">删除用户</el-button>
                            <el-button @click="editInfo = true,modalTitle='修改密码'" type="text" size="small">密码修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="添加用户" :visible.sync="dialogFormVisible" class="demoDialog"  width="500px">
                    <el-form :inline="true" ref="ruleAdd" :model="userInfo" :rules="addUserRules">
                        <el-form-item label="账户" prop="id" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.id"></el-input>
                        </el-form-item>
                         <el-form-item label="昵称" prop="userName" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="passWord" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.passWord" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                        <el-button type="primary" @click="addUser" size="small" style="margin-left:30px;">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog :title="modalTitle" :visible.sync="editInfo" class="demoDialog"  width="500px">
                    <el-form :inline="true" ref="ruleAdd" :model="userInfo" :rules="addUserRules" style="padding-top:20px">
                         <el-form-item label="昵称" prop="userName" v-if="modalTitle=='修改信息'" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="passWord"  v-if="modalTitle=='修改密码'" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.passWord" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="editInfo = false" size="small">取 消</el-button>
                        <el-button type="primary" @click="addUser" size="small" style="margin-left:30px;">确 定</el-button>
                    </div>
                </el-dialog>
                 <el-pagination
                @current-change="changePage"
                :current-page="currentPage"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
            </div>
            
        </div>
    </div>
</template>

<script>
import { stringify } from 'querystring';
import { formatDate } from '../../util/date.js';
export default {
    name:'user',
    data(){
        return{
        currentPage:1,
        editInfo:false,
        modalTitle:'',
        userInfo:{
            id:"",
            userName:"",
            passWord:"",
        },
        addUserRules:{
            id:[
                { required: true, message: '请输入账户', trigger: 'change' },
            ],
            userName:[
                { required: true, message: '请输入昵称', trigger: 'change' },
            ],
            passWord:[
                { required: true, message: '请输入密码', trigger: 'change' },
            ],
        },
            current:1,
            total:1,
            tableData: [
              { 
                phone:"13333333333",
                id:'123456789',
                name:'张三',
                age:'18',
                bank:'农业银行',
                address:'中国农业银行股份有限公司铁东支行',
                time:'2019-6-18',
                status:'禁用'
              }
            ],
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
        // this.getData();
    },
    methods:{
        ifdel(){
            this.$confirm('确定删除用户吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        addUser(){
            this.$refs['ruleAdd'].validate((valid) => {
                 valid?console.log('添加成功！'):console.log('请先完善表单！')
            })
        },
        changePage(index){
          //清空
          this.tableData = []
          this.current = index
        //   this.getData() 
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
                ...this.formInline,
                currentPage:this.current,
                pageSize:10,
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

