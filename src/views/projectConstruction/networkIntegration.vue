<template>
 <!-- 专网整合进度 -->
    <div>
        <!-- 整合计划 -->
        <div v-if="isplan" class="networkBasic">
            <div class="searchBox">
                <el-row>
                    <el-col :span="11">
                        <div style="text-align:left">
                            <el-button type="primary" size="small" @click="handleClick('新增')">新增专网整合计划</el-button>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <span>整合状态</span>
                            <el-select v-model="search.status" size="small" style="margin-left:15px;">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="进行中" value="0"></el-option>
                                <el-option label="已完成" value="1"></el-option>
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
                    prop="networkName"
                    label="专网名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="deptName"
                    label="主管部门"
                    >
                    </el-table-column>
                    <el-table-column
                    label="计划时间"
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.planStart}} - {{scope.row.planEnd}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="整合状态"
                    >
                    <template slot-scope="scope">
                        <el-select :disabled="scope.row.planStatus=='已完成'" @change="changeStatus(scope.row)" v-model="scope.row.planStatus" size="small" style="margin-left:15px;">
                            <el-option label="进行中" value="0"></el-option>
                            <el-option label="已完成" value="1"></el-option>
                        </el-select>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                    <template slot-scope="scope">
                        <el-button @click="handleClick('查看',scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="handleClick('修改',scope.row)" v-if="scope.row.status==0" type="text" size="small">修改整合计划</el-button>
                        <el-button type="text" size="small" @click="progressFun(scope.row)">整合进度</el-button>
                        <!-- <el-button type="text" size="small" @click="deleteNetwork(scope.row.id)">删除</el-button> -->
                    </template>
                    </el-table-column>
                </el-table>
                <!-- 进行中 -->
                <el-dialog
                    title="选择完成时间"
                    :visible.sync="dialogVisibleTime"
                    width="30%"
                    :before-close="handleCloseTime">
                    <div>注：完成后将不能变更状态及完成时间</div>
                    <div style="margin-top:20px;">
                        <span style="margin-right:10px;">请选择完成时间:</span>
                        <el-date-picker
                        v-model="componetTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="handleCloseTime()">取 消</el-button>
                        <el-button type="primary" @click="changeStatusFun()">确 定</el-button>
                    </span>
                </el-dialog>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page.sync="search.currentPage"
                    :page-size="search.pageSize"
                    :total="total">
                </el-pagination>
                <!-- modal -->
                <el-dialog
                :title="modalTitle+'专网整合计划'"
                :visible.sync="dialogVisible"
                :before-close="handleClose"
                width="70%"
                >
                    <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" :disabled="modalTitle=='查看'" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="行业专网名称" label-width="140px" prop="networkId">
                            <el-select v-model="ruleForm.networkId" filterable placeholder="请选择行业专网名称">
                                <el-option :label="item.name" :value="item.id" v-for="(item,index) in getNetworkList" :key="index"></el-option>
                            </el-select>
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
                                <!-- <el-select v-else :v-model="loginInfo.deptId" disabled>
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
                        <el-form-item label="计划时间" label-width="90px" prop="contracTime">
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
                        <el-form-item label="整合方式" style="width:460px;" prop="type">
                            <el-radio-group v-model="ruleForm.type">
                                <el-radio  :label="item.id" v-for="(item,index) in getCombineTypeList" :key="index">{{item.dictName}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="金" label-width="10px" style="visibility:hidden;">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item style="text-align:center;width:100%" v-if="modalTitle!='查看'">
                            <el-button type="primary" @click="submitForm('ruleForm',0)">保存</el-button>
                            <!-- <el-button type="primary" @click="submitForm('ruleForm',1)">提交</el-button> -->
                            <el-button @click="resetForm('ruleForm')">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <el-dialog
                title="查看"
                :visible.sync="dialogVisibleEye"
                :before-close="handleCloseEye"
                width="70%"
                >
                    <table>
                        <tr>
                            <td>原专网名称:</td>
                            <td>{{ruleForm.networkName}}</td>
                            <td>主管部门:</td>
                            <td>{{ruleForm.deptName}}</td>
                        </tr>
                        <tr>
                            <td>整合方式:</td>
                            <td colspan="3">{{ruleForm.type}}</td>
                        </tr>
                        <tr>
                            <td>计划时间:</td>
                            <td colspan="3">{{ruleForm.planStart}}-{{ruleForm.planEnd}}</td>
                        </tr>
                    </table>
                    <!-- 进度条 -->
                    <div style="margin:20px 0">
                        <el-row>
                                    <mySimpleProgress 
                                    :myprop="ruleForm" 
                                    :status="ruleForm.status"
                                    :planStartDate="ruleForm.planStart"
                                    :planEndDate="ruleForm.planEnd"
                                    :nowDate="ruleForm.thisDate"
                                    :finishedDate="ruleForm.finishTime||null"
                                    >
                                    </mySimpleProgress>
                            </el-row>
                    </div>
                    <!-- 整合进度 -->
                    <el-table
                    :data="progressList"
                    border
                    style="width: 100%">
                        <el-table-column
                        type="index"
                        label="序号"
                        width="50"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        label="填报时间"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="progressDesc"
                        label="整合进展描述"
                        >
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        >
                        <template slot-scope="scope">
                            <el-button @click="handleClickProgress(scope.row,'查看')" type="text" size="small">查看整合进度</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </el-dialog>
            </div>
        </div>
        <!-- 整合进度 -->
        <div v-else>
            <div class="networkBasic">
                <div>
                    <el-button type="primary" size="small" @click="dialogVisibleProgress = !dialogVisibleProgress">填报整合进度</el-button>
                    <el-button type="primary" size="small" @click="isplan= !isplan">返 回</el-button>
                </div>
                <div>
                    <el-table
                    :data="tableDataProgress"
                    border
                    style="width: 100%">
                        <el-table-column
                        type="index"
                        label="序号"
                        width="50"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        label="填报时间"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="progressDesc"
                        label="整合进展描述"
                        >
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        >
                        <template slot-scope="scope">
                            <el-button @click="handleClickProgress(scope.row,'查看')" type="text" size="small">查看整合进度</el-button>
                            <el-button type="text" size="small" @click="deleteNetworkProgress(scope.row.id)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="handleCurrentChangeProgress"
                        :current-page.sync="Progress.currentPage"
                        :page-size="Progress.pageSize"
                        :total="totalProgress">
                    </el-pagination>
                </div>
            </div>
        </div>
         <el-dialog
            title="填报整合进度"
            :visible.sync="dialogVisibleProgress"
            :before-close="handleCloseProgress"
            width="70%"
            >
                <el-form :model="ruleFormProgress" :rules="rules1" ref="ruleFormProgress" :disabled="modalTitleProgress=='查看'" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="原专网名称：" label-width="140px" prop="planName">
                            {{Progress.planName?Progress.planName:ruleForm.networkName}}
                    </el-form-item>
                    <el-form-item label="整合进度描述：" label-width="140px" prop="progressDesc">
                            <el-input type="textarea" v-model="ruleFormProgress.progressDesc" placeholder="请填写整合进度描述" :rows="5"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:center;width:100%" v-if="modalTitleProgress!='查看'">
                        <el-button type="primary" @click="submitFormProgress('ruleFormProgress')">提交</el-button>
                        <el-button @click="handleCloseProgress">取消</el-button>
                    </el-form-item>
                </el-form>
        </el-dialog>
    </div>
</template>

<script>
import mySimpleProgress from '../../components/simpleProgress.vue';
import { mapState } from 'vuex'
export default {
    name:'networkBasic',
    components:{mySimpleProgress},
    data(){
        return{
            planStatus:'未完成',
            tableData: [],
            search:{
                status:'',
                networkName:'',
                currentPage:1,
                pageSize:10
            },
            total:0,
            dialogVisible:false,
            ruleForm:{
                "deptId": '',//主管部门
                "id": null,//修改，查看id
                "networkId": '',//整合专网id
                "planEnd": "",//计划结束时间
                "planStart": "",//计划开始时间
                "status": 0,//提交状态，保存：0，提交：1
                "type": "",//整合方式
                "contracTime":""//合同时间
            },
            rules1: {
                progressDesc:[{ required: true, message: '请填写活动形式', trigger: 'blur' }]
            },
            rules:{},
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
            getNetworkList:[],//全部专网
            isplan:true,//是否是整合计划，否则是整合进度
            Progress:{
                currentPage:1,
                pageSize:10,
                planId:'',
                planName:'',
            },
            totalProgress:0,
            tableDataProgress:[],
            dialogVisibleProgress:false,
            ruleFormProgress:{
                "progressDesc": ""
            },
            modalTitleProgress:'填报',
            dialogVisibleEye:false,
            progressList:[],
            getCombineTypeList:[],
            DeptTreeList:[],
            defaultProps:{
                children: 'childs',
                label: 'deptName'
            },
            deptNameTree:false,
            dialogVisibleTime:false,
            componetTime:'',
            recordsTime:{}
        }
    },
    computed: mapState({
        // 箭头函数可使代码更简练
        loginInfo: state => state.loginInfo.user,
    }),
    methods:{
        init(){
            let rules = {};
            // 计算必填项验证规则
            for(let i in this.ruleForm){
                rules[i] = [
                    {required: true, message: '必填项，请输入', trigger: 'change' }
                ]
            }
            this.rules = rules;
        },
        //页面所有的方法写在这里
        getData(){
            // 初始化列表
            this.$http("get", "/networkPlan/list",this.search).then(data => {
                this.tableData = data.data.page.records;
                this.total = data.data.page.total;
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
            // 获取专网
            this.$http("get", "/network/getNetworkList").then(data => {
                this.getNetworkList = data.data.list;
            });
            // 整合方式
            this.$http("get", "/dict/getCombineTypeList").then(data => {
                this.getCombineTypeList = data.data.list;
            });
        },
        // 修改-查看
        handleClick(title,row) {
            if(title=='修改'||title=='新增'){
                this.modalTitle = title;
                this.dialogVisible = true;
            }else{
                this.dialogVisibleEye = true;
            }
            // console.log(row);
            // 用接口获取详情
            if(row){
                this.$http("get", "/networkPlan/info/"+row.id).then(data => {
                    if(data.code==200){
                        // 处理回填数据
                        this.ruleForm = data.data.object;
                        this.ruleForm['contracTime'] = [];
                        this.ruleForm.contracTime[0] = this.ruleForm.planStart;
                        this.ruleForm.contracTime[1] = this.ruleForm.planEnd;
                        this.progressList = data.data.object.progressList;
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
            this.$refs[formName].validate((valid) => {
            if (valid) {
                // 查看和修改主管部门暂时做成了不可修改
                if(this.modalTitle=='新增'){
                    if(!this.loginInfo.userType){
                        // 如果不是admin用户
                        this.ruleForm.deptId = this.loginInfo.deptId;
                    }
                }
                // 起始时间
                this.ruleForm.planStart =  this.ruleForm.contracTime[0]+' 00:00:00';
                this.ruleForm.planEnd =  this.ruleForm.contracTime[1]+' 00:00:00';
                delete this.ruleForm.contracTime;
                this.ruleForm.status = index;
                this.$http("post", "/networkPlan/insertOrUpdate",this.ruleForm).then(data => {
                    if(data.code==200){
                        this.$message.success(data.msg);
                        this.dialogVisible = false;
                        this.$refs['ruleForm'].resetFields();
                        // 调用list接口
                       this.searchFun();
                    }else{
                        this.$message.error(data.msg);
                    }
                });
            } else {
                console.log('error submit!!');
                return false;
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
        searchFun(){
             this.$http("get", "/networkPlan/list",this.search).then(data => {
                this.tableData = data.data.page.records;
                this.total = data.data.page.total;
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
            // 清楚数据
            this.resetForm('ruleForm');
            this.ruleForm =  {
                "deptName":'',//主管部门name
                "deptId": [],//主管部门
                "id": null,//修改，查看id
                "networkId": '',//整合专网id
                "planEnd": "",//计划结束时间
                "planStart": "",//计划开始时间
                "status": 0,//提交状态，保存：0，提交：1
                "type": "Y",//整合方式
                "contracTime":""//合同时间
            }
        },
        // 删除专网
        deleteNetwork(id){
            this.$http("post", "/networkPlan/delete/"+id).then(data => {
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
        handleCurrentChangeProgress(val) {
            this.progress.currentPage = val;
            this.$http("get", "/networkPlanProgress/list",this.Progress).then(data => {
                if(data.code==200){
                    this.tableDataProgress = data.data.page.records;
                    this.totalProgress = data.data.page.total;
                    this.Progress.currentPage = data.data.page.current;
                }
            })
        },
        //改变状态
        changeStatus(row){
            if(row.planStatus=='1'){
                this.dialogVisibleTime = true;
                this.recordsTime=row;
            }
        },
        changeStatusFun(){
            if(this.componetTime != ''){
                let row = this.recordsTime;
                row.status = 1;
                this.$http("post", "/networkPlan/insertOrUpdate",{id:row.id,status:row.status,finishTime:this.componetTime}).then(data => {
                    if(data.code==200){
                        this.$message.success(data.msg);
                        this.searchFun();
                        this.dialogVisibleTime = false;
                    }
                })
            }else{
                this.$message.warning('请选择完成时间');
            }
        },
        // 点击整合进度
        progressFun(row){
            this.isplan = false;
            this.Progress.planName = row.networkName; 
            this.Progress.planId = row.id;   
            this.$http("get", "/networkPlanProgress/list",this.Progress).then(data => {
                if(data.code==200){
                    this.tableDataProgress = data.data.page.records;
                    this.totalProgress = data.data.page.total;
                    this.Progress.currentPage = data.data.page.current;
                }
            })
        },
        // 查看整合进度
        handleClickProgress(row,name){
            this.modalTitleProgress = name;
            this.$http("get", "/networkPlanProgress/info/"+row.id).then(data => {
                if(data.code==200){
                    this.ruleFormProgress = data.data.object;
                    this.dialogVisibleProgress = true;
                }
            })
        },
        // 整合进度提交
        submitFormProgress(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {    
                console.log(valid)
                this.ruleFormProgress.planId = this.Progress.planId;
                this.$http("post", "/networkPlanProgress/save",this.ruleFormProgress).then(data => {
                    if(data.code==200){
                        this.$message.success(data.msg);
                        this.handleCloseProgress();
                        this.$http("get", "/networkPlanProgress/list",this.Progress).then(data => {
                            if(data.code==200){
                                this.tableDataProgress = data.data.page.records;
                                this.totalProgress = data.data.page.total;
                                this.Progress.currentPage = data.data.page.current;
                            }
                        })
                    }
                })
            }else {
                console.log('error submit!!');
                return false;
            }
            })
        },
        handleCloseProgress(){
            this.dialogVisibleProgress = false;
            this.$refs['ruleFormProgress'].resetFields();
            this.ruleFormProgress ={
                "progressDesc": ""
            }
            this.modalTitleProgress = '填报'
        },
        // 删除整合专网进度
        deleteNetworkProgress(id){
            this.$http("post", "/networkPlanProgress/delete/"+id).then(data => {
                if(data.code==200){
                    this.$message.success(data.msg);
                    this.handleCloseProgress();
                    this.$http("get", "/networkPlanProgress/list",this.Progress).then(data => {
                        if(data.code==200){
                            this.tableDataProgress = data.data.page.records;
                            this.totalProgress = data.data.page.total;
                            this.Progress.currentPage = data.data.page.current;
                        }
                    })
                }
            })
        },
        handleCloseEye(){
            this.ruleForm = {
                "deptId": '',//主管部门
                "id": null,//修改，查看id
                "networkId": '',//整合专网id
                "planEnd": "2019-05-05T05:56:45.020Z",//计划结束时间
                "planStart": "2019-05-05T05:56:45.020Z",//计划开始时间
                "status": 0,//提交状态，保存：0，提交：1
                "type": "Y",//整合方式
                "contracTime":""//合同时间
            },
            this.dialogVisibleEye = false;
        },
        // 主管部门tree点击
        handleNodeClick(data){
            this.ruleForm.deptId = data.id;
            this.ruleForm.deptName = data.deptName;
            this.deptNameTree = false;
        },
        handleCloseTime(){
            this.dialogVisibleTime = false;
            this.componetTime = '';
            this.searchFun();
        }
    },
    mounted(){
        this.init();
        this.getData();//一定要在这里调用
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
td{
    padding: 0 7px;
}
tr td:nth-child(1),tr td:nth-child(3){
    width: 100px;
    text-align: right;
    font-weight: 500;
    line-height: 40px;
}
tr td:nth-child(2),tr td:nth-child(4){
    width: 400px;
    text-align: left;
    line-height: 40px;
}
table{
    margin-bottom: 60px;
    background-color: #f8f9fb;
    border: 1px solid #eaedf5;
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
<style>
.networkBasic .lineLabel .el-form-item__label{
    line-height: 20px;
}
</style>


