<template>
 <!-- 行业专网基础情况 -->
    <div class="networkBasic">
        <div class="searchBox">
            <el-row>
                <el-col :span="5">
                    <div style="text-align:left">
                        <el-button type="primary" size="small" @click="handleClick('新增')">新增行业专网</el-button>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div>
                        <span>管理机构</span>
                        <el-input class="inlineStyle" style="width:150px;" v-model="search.companyName" size="small" placeholder="请输入管理机构"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div>
                        <span>填报状态</span>
                        <el-select v-model="search.status" size="small" style="margin-left:15px;width:150px;">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="保存" value="0"></el-option>
                            <el-option label="提交" value="1"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div>
                        <el-input v-model="search.networkName" class="inlineStyle" size="small" placeholder="请输入专网名称"></el-input>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div>
                        <el-button type="primary" size="small" @click="searchFun()">查询</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-table
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="50"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="专网名称"
                >
                </el-table-column>
                <el-table-column
                prop="deptName"
                label="主管部门"
                >
                </el-table-column>
                <el-table-column
                prop="upRunTime"
                label="上线运行时间"
                >
                </el-table-column>
                <el-table-column
                label="填报状态"
                prop="fillStatus"
                >
                </el-table-column>
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick('查看',scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="handleClick('修改',scope.row)" v-if="scope.row.status==0" type="text" size="small">修改</el-button>
                    <el-button type="text" size="small" @click="deleteNetwork(scope.row.id)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page.sync="search.currentPage"
                :page-size="search.pageSize"
                :total="search.total">
            </el-pagination>
            <!-- modal -->
            <el-dialog
            :title="modalTitle+'行业专网'"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            width="70%"
            >
                <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" :disabled="modalTitle=='查看'" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="行业专网名称" label-width="140px" prop="name">
                        <el-input v-model="ruleForm.name" maxlength="30"></el-input>
                    </el-form-item>
                    <el-form-item label="主管部门" label-width="140px" prop="deptId">
                        <!--admin用户可以选择所有的主管部门，其他用户根据登录信息，带出主管部门 -->
                        <!-- <div v-if="modalTitle=='新增'">
                            <el-cascader
                            v-if="loginInfo?loginInfo.userType:true"
                            :options="options"
                            change-on-select
                            @change="handleItemChange"
                            :props="props"
                            v-model="ruleForm.deptId"
                            style="width: 272px;position: relative;left: -7px;"
                            ></el-cascader> -->
                            <!-- 其他用户都必须有主管部门 -->
                            <!-- <el-select v-else v-model="loginInfo.deptId" disabled>
                                <el-option :label="loginInfo.deptName" :value="loginInfo.deptId"></el-option>
                            </el-select>
                        </div>
                        <div v-else>
                            <el-select  v-model="ruleForm.deptId" disabled>
                                <el-option :label="ruleForm.deptName" :value="ruleForm.deptId"></el-option>
                            </el-select>
                        </div> -->
                        <!-- <el-input v-else v-model="loginInfo.deptName" disabled> -->
                        <!-- </el-input> -->
                        <div class="deptName">
                            <div v-if="loginInfo?loginInfo.userType:true">
                                <el-input v-model="ruleForm.deptName" @focus="deptNameTree = !deptNameTree">{{loginInfo?loginInfo.deptName:''}}</el-input>
                            </div>
                            <div v-else>
                                <el-input v-model="loginInfo.deptName" disabled></el-input>
                            </div>
                            <div class="deptNameTree" v-if="deptNameTree">
                                <el-tree  node-key="id" :data="DeptTreeList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="建设依据描述" label-width="120px" prop="buildDesc">
                        <el-input maxlength="800" type="textarea" v-model="ruleForm.buildDesc" style="width:670px"></el-input>
                    </el-form-item>
                    <el-form-item label="承载业务名称" label-width="140px" prop="businessName">
                        <el-input maxlength="30" v-model="ruleForm.businessName"></el-input>
                    </el-form-item>
                    <el-form-item label="上线运行时间" label-width="140px" prop="upRunTime">
                        <el-date-picker
                            v-model="ruleForm.upRunTime"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="覆盖用户范围" label-width="140px" prop="coverScope">
                        <el-select v-model="ruleForm.coverScope" placeholder="请选择覆盖用户范围">
                            <el-option :label="item.dictName" :value="item.id" v-for="(item,index) in getCoverScopeList" :key="index"></el-option>
                            <!-- <el-option label="市县各级" value=""></el-option>
                            <el-option label="省市县各级" value=""></el-option>
                            <el-option label="其他" value=""></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="管理机构" label-width="140px" prop="companyName">
                        <el-input maxlength="30" v-model="ruleForm.companyName"></el-input>
                    </el-form-item>
                    <el-form-item label="管理机构联系人" label-width="140px" prop="contactName">
                        <el-input maxlength="30" v-model="ruleForm.contactName"></el-input>
                    </el-form-item>
                    <el-form-item label="管理机构联系电话" label-width="140" prop="contactPhone">
                        <el-input maxlength="20" v-model="ruleForm.contactPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="主干网络带宽" label-width="140px" prop="bandwidth">
                        <el-input maxlength="30" v-model="ruleForm.bandwidth"></el-input>
                    </el-form-item>
                    <el-form-item label="网络固定年度租金" label-width="140px" prop="rent">
                        <el-input maxlength="30" type="number" v-model="ruleForm.rent"></el-input>
                    </el-form-item>
                    <el-form-item label="网络通信和安全设备" label-width="160px" prop="" class="formTable">
                       <el-button type="primary" v-if="modalTitle!='查看'" size="small" @click="addTr">添加一行</el-button>
                       <el-button type="primary" v-if="modalTitle!='查看'" size="small" @click="deleteTr">删 除</el-button>
                       <div class="tableTitle">网络通信和安全设备</div>
                       <el-table
                            ref="multipleTable"
                            :data="ruleForm.equipmentList"
                            tooltip-effect="dark"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            label="设备名称"
                            width="300">
                            <template slot-scope="scope">
                                <el-input maxlength="40" v-model="scope.row.name"></el-input>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="数量"
                            width="300">
                            <template slot-scope="scope">
                                <el-input maxlength="40" type="number" v-model="scope.row.quantity"></el-input>
                            </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item label="网络承载运营商" label-width="140px" prop="operator">
                        <el-input maxlength="50" v-model="ruleForm.operator"></el-input>
                    </el-form-item>
                    <el-form-item label="是否签订网络承载合同" style="width:400px;" label-width="140px" prop="isSign" class="lineLabel">
                        <el-radio-group v-model="ruleForm.isSign">
                            <el-radio  label="Y">是</el-radio>
                            <el-radio  label="N">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="合同起止时间" label-width="107px" prop="contracTime">
                        <el-date-picker
                            v-model="ruleForm.contracTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="金" label-width="10px" style="visibility:hidden;">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:center;width:100%" v-if="modalTitle!='查看'">
                        <el-button type="primary" @click="submitForm('ruleForm',0)">保存</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm',1)">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'networkBasic',
    data(){
        return{
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
                }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
                }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333
                }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333
            }],
            search:{
                companyName:'',
                status:'',
                networkName:'',
                total:0,
                currentPage:1,
                pageSize:10
            },
            dialogVisible:false,
            ruleForm:{
                "bandwidth": "",//主干网络带宽
                "buildDesc": "",//建设依据描述
                "businessName": "",//承载业务名称
                "companyName": "",//管理机构
                "contactName": "",//管理机构联系人
                "contactPhone": "",//管理机构联系电话
                "contracTime":[],//合同时间
                "contractEnd": "",//合同时间
                "contractStart": "",//合同时间
                "coverScope": "",//覆盖用户范围
                "deptId": '',//主管部门id
                "deptName":'',
                "equipmentList": [
                    {
                    "id":1,
                    "name": "",//设备名称
                    "quantity": 0//数量
                    }
                ],
                "id": null,
                "isSign": "Y",//是否签订网络承载合同
                "name": "",//行业专网名称
                "operator": "",//网络承载运营商
                "rent": '',//网络固定年度租金
                "status": '',//提交状态，保存：0，提交：1
                "upRunTime": ""//上线运行时间
            },
            rules: {},
            multipleSelection: [],
            value1: '',
            modalTitle:'新增',
            getCoverScopeList:[],//用户覆盖范围
            options: [],
            props: {
                value: 'id',
                label:'deptName',
                children: 'deptList'
            },
            DeptTreeList:[],
            defaultProps:{
                children: 'childs',
                label: 'deptName'
            },
            deptNameTree:false
        }
    },
    computed: mapState({
        // 箭头函数可使代码更简练
        loginInfo: state => state.loginInfo.user,
    }),
    methods:{
        init(){
            let rules = {};
            // 计算必填项验证规则,当表单是下拉菜单的时候，blur不能验证，必须要用change
            for(let i in this.ruleForm){
                if(i == 'deptId'||i =='coverScope'){
                    rules[i] = [
                        {required: true, message: '必填项，请输入', trigger: 'change' }
                    ]
                }else{
                    rules[i] = [
                        {required: true, message: '必填项，请输入', trigger: 'blur' }
                    ]
                }
            }
            this.rules = rules;
        },
        //页面所有的方法写在这里
        getData(){
            // 初始化列表
            this.$http("get", "/network/list",this.search).then(data => {
                this.tableData = data.data.page.records;
                this.search.total = data.data.page.total;
                this.search.currentPage = data.data.page.current;
            });
            // 覆盖范围
            this.$http("get", "/dict/getCoverScopeList").then(data => {
                this.getCoverScopeList = data.data.list;
            });
            // 获取主管
            this.$http("get", "/dept/getDeptTreeList").then(data => {
                // 为级联组件添加children
                this.DeptTreeList = data.data.list;
            });
        },
        // 查看-修改
        handleClick(title,row) {
            this.modalTitle = title;
            this.dialogVisible = true;
            // console.log(row);
            // 用接口获取详情
            if(row){
                this.$http("get", "/network/info/"+row.id).then(data => {
                    if(data.code==200){
                        // 处理回填数据
                        this.ruleForm = data.data.object;
                        if(this.ruleForm.contractStart){
                            this.ruleForm.contracTime = [];//手动加上时间
                            this.ruleForm.contracTime.push(this.ruleForm.contractStart);
                            this.ruleForm.contracTime.push(this.ruleForm.contractEnd);
                        }
                    }
                });
            }
        },
        submitForm(formName,index) {
            // 非admin用户默认带出主管部门
            if(!this.loginInfo.userType){
                this.ruleForm.deptName = this.loginInfo.deptName;
                this.ruleForm.deptId = this.loginInfo.deptId;
            }
            // 保存不触发表单验证
            if(index==1){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitFormFun(formName,index);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }else{
                this.submitFormFun(formName,index);
            }
        },
        // 真实的提交函数
        submitFormFun(formName,index) {
            // 处理数据 主管部门/起始时间/网络通信和安全设备
            // 查看和修改主管部门暂时做成了不可修改
            if(this.modalTitle=='新增'){
                if(!this.loginInfo.userType){
                    // 如果不是admin用户
                    this.ruleForm.deptId = this.loginInfo.deptId;
                }
            }
            // 起始时间
            if(this.ruleForm.contracTime.length >0){
                this.ruleForm.contractStart =  this.ruleForm.contracTime[0]+' 00:00:00';
                this.ruleForm.contractEnd =  this.ruleForm.contracTime[1]+' 00:00:00';
            }
            if(this.ruleForm.upRunTime){
                this.ruleForm.upRunTime = this.ruleForm.upRunTime+' 00:00:00'
            }
            // 去掉网络通信和安全设备中的id
            for(let i of this.ruleForm.equipmentList){
                delete i.id;
            }
            this.ruleForm.status = index;
            this.$http("post", "/network/insertOrUpdate",this.ruleForm).then(data => {
                console.log(data);
                if(data.code==200){
                    this.$message.success(data.msg);
                    this.dialogVisible = false
                    this.handleClose();
                    // 刷新列表
                    this.searchFun(true)
                }else{
                    this.$message.error(data.msg);
                }
            });
        },
        resetForm(formName) {
            this.dialogVisible = false;
            this.$refs[formName].resetFields();
        },
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 点击查询
        searchFun(isRe){
            if(!isRe){
                this.search.currentPage = 1;
            }
             this.$http("get", "/network/list",this.search).then(data => {
                this.tableData = data.data.page.records;
                this.search.total = data.data.page.total;
                this.search.currentPage = data.data.page.current;
            });
        },
        // 添加一行
        addTr(){
            let lastID = this.ruleForm.equipmentList[this.ruleForm.equipmentList.length-1].id;
            this.ruleForm.equipmentList = this.ruleForm.equipmentList.concat([{
                "id":lastID+1,
                "name": "",//设备名称
                "quantity": 0//数量
            }])
            console.log(this.ruleForm.equipmentList)
        },
        // 删除一行
        deleteTr(){
            let newArr=this.ruleForm.equipmentList.filter(item=>!this.multipleSelection.some(ele=>ele.id===item.id));
            this.ruleForm.equipmentList = newArr;
        },
        // 主管部门admin用户，级联
        handleItemChange(id) {
            console.log(this.ruleForm.deptId);
            // 点击上级调用下级查询接口
             this.$http("get", "/dept/getDeptList?deptId="+id).then(data => {
                if(data.data.list){
                    for(let i of data.data.list){
                        i.deptList = []
                    }
                    // 给options的这条数据加上deptList
                    for(let i of this.options){
                        if(i.id == id){
                            i.deptList = data.data.list
                        }
                    }
                    }
            });
        },
        handleClose() {
            this.resetForm('ruleForm');
            this.ruleForm.equipmentList =[
                {
                    "id":1,
                    "name": "",//设备名称
                    "quantity": 0//数量
                }
            ]
            this.ruleForm.deptName = '';
            this.ruleForm.deptId = '';
            this.ruleForm.contractStart =  '';
            this.ruleForm.contractEnd = '';
        },
        // 删除专网
        deleteNetwork(id){
            this.$http("post", "/network/delete/"+id).then(data => {
                if(data.code == 200){
                    this.$message.success('删除成功');
                    this.searchFun();
                }else{
                    this.$message.error(data.msg)
                }
            });
        },
        handleCurrentChange(val) {
            this.search.currentPage = val;
            this.searchFun(true);
        },
        handleNodeClick(data){
            this.ruleForm.deptId = data.id;
            this.ruleForm.deptName = data.deptName;
            this.deptNameTree = false;
        }
    },
    mounted(){
        this.getData();//一定要在这里调用
        this.init();
    }
}
</script>

<style scoped>
/* 在这里写css样式 */
/* 新建完了这个页面要去添加路由，在src/router.js里面添加，添加方法在readme里面 */
.networkBasic{
    background-color: #e6ebef;
}
.networkBasic>div{
    padding: 15px 10px;
    background-color: #ffffff;
    margin-bottom: 15px;
}
.inlineStyle{
    width: 180px;
    margin-left: 15px;
}
.searchBox{
    font-size: 14px;
    text-align: right;
}
.demo-ruleForm .el-input,.demo-ruleForm .el-select{
    width: 250px;
    margin-right: 20px;
}
.demo-ruleForm{
    text-align: center;
}
.demo-ruleForm>div{
    text-align: left;
}
.formTable{
    width:100%;
    padding-left:45px;
}
.formTable .el-table{
    border: 1px solid #ebeef5;
    margin-bottom: 20px;
}
.tableTitle{
    height: 35px;
    line-height: 35px;
    background-color: #409eff;
    text-align: center;
    color: #ffffff;
    margin-top: 20px;
}
</style>
<style>
.networkBasic .lineLabel .el-form-item__label{
    line-height: 20px;
}
.deptName{
    position: relative;
}
.deptNameTree{
    position:absolute;
    z-index: 10;
    background-color:#ffffff;
    padding: 10px 0; 
    box-shadow: 1px 1px 10px #cccccc;
}
</style>


