<template>
 <!-- 工作计划 -->
    <div class="special-audit">
      <el-row>
        <el-col :span="3">
          <el-button @click="showNewModal">
          新建审计报告
          </el-button>
        </el-col>
        <el-col :offset="15" :span="6" style="display:flex;align-item:center">
          <el-input v-model="auditName" size="small" placeholder="请输入管理机构" style="width:180px"></el-input>
          <el-button type="primary" style="height:32px;line-height:5px" @click="searchHandle">
          搜索
          </el-button>
        </el-col>
      </el-row>
      
      
          <el-table
            ref="Table"
            :data="tableData"
            border
            class="table_style">
            <el-table-column
            align='center'
            label="序号"
            type="index"
            width="50"
            >
            </el-table-column>
            <el-table-column
            align='center'
            prop="name"
            label="审计报告名称"
            >
            </el-table-column>
            <el-table-column
            align='center'
            prop="auditDeptName"
            label="被审计单位">
            </el-table-column>
            <el-table-column
            align='center'
            prop="createTime"
            label="审计时间"
            width="180"
            >
            </el-table-column>
             <el-table-column
            align='center'
            label="操作"
            width="150"
            >
            <template slot-scope="scope">
                <el-button type="text" @click="showModal(scope.row.id)">查看</el-button>
                <el-button type="text" @click="isDelete(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新建审计报告" :visible.sync="dialogFormVisible">
            <el-form :model="formData">
                <el-form-item label="审计报告名称" :label-width="formLabelWidth">
                  <el-input v-model="formData.name" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="被审计单位" :label-width="formLabelWidth">
                  <el-cascader
                  :options="options1"
                  :show-all-levels="false"
                  ></el-cascader>
                </el-form-item> -->
                <el-form-item label="被审计单位" :label-width="formLabelWidth" prop="auditDeptId">
                        <el-cascader
                        v-if="loginInfo.userType"
                        :options="DeptTreeList"
                        :props="defaultProps"
                        v-model="formData.auditDeptId"
                        change-on-select
                        clearable
                        style="width:400px"
                        >
                        </el-cascader>
                        <!-- 其他用户都必须有主管部门 -->
                        <el-select v-else v-model="loginInfo.deptId" disabled style="width:400px">
                            <el-option :label="loginInfo.deptName" :value="loginInfo.deptId"></el-option> -->
                        </el-select>
                        <!-- <el-input v-else v-model="loginInfo.deptName" disabled> -->
                        <!-- </el-input> -->
                    </el-form-item>

                <!-- <el-form-item label="信息系统名称" :label-width="formLabelWidth"> -->
                <!-- <el-input v-model="formData.infoId" autocomplete="off"></el-input> -->
                    <el-form-item label="信息系统名称" :label-width="formLabelWidth">
                            <el-select v-model="formData.infoId" placeholder="请选择信息系统名称">
                                <el-option  v-for="i in getBuildTypeList" :label="i.system_name" :value="i.id" :key="i.id"></el-option>
                            </el-select>
                    </el-form-item>
                <!-- </el-form-item> -->
                <el-form-item label="上传报告附件" :label-width="formLabelWidth">
                <el-upload
                name="multipartFile"
                class="upload-demo"
                action="/info/attachment/uploadFile"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
                :on-success="fileSuccess"
                accept=".pdf,.jpg,.png,.doc,.docx,.xls,.xlsx">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">支持pdf,jpg,png,doc,docx,xls,xlsx格式文件上传</div>
                </el-upload>
                </el-form-item>
                <el-form-item label="报告描述" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="formData.description" autocomplete="off" :autosize="{ minRows: 3, maxRows: 6}"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveOne">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="查看审计报告" :visible.sync="showdialogFormVisible">
            <el-form :model="formData">
                <el-form-item label="审计报告名称" :label-width="formLabelWidth">
                {{oneDetail.name}}
                </el-form-item>
                <el-form-item label="被审计单位" :label-width="formLabelWidth">
                {{oneDetail.auditDeptName||'--'}}
                </el-form-item>
                <el-form-item label="信息系统名称" :label-width="formLabelWidth">
                {{oneDetail.systemName||''}}
                </el-form-item>
                <el-form-item label="审计时间" :label-width="formLabelWidth">
                {{oneDetail.createTime}}
                </el-form-item>
                <el-form-item label="报告附件下载" :label-width="formLabelWidth">
                <ul>
                    <li v-for="(item,index) in oneDetail.attachmentList" :key="index">
                      <!-- <a :href="item.url">{{item.name}}</a> -->
                      
                      <a @click="downLoad(item.id)" style="cursor:pointer;color:blue">
                        {{item.name}}
                      </a>
                    </li>
                </ul>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showdialogFormVisible = false">关闭</el-button>
            </div>
        </el-dialog>
        <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="changePage">
      </el-pagination>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'specialAudit',
    data(){
        return{
        DeptTreeList:[],
        defaultProps:{
            children: 'childs',
            label: 'deptName',
            value: 'id'
         },
         getBuildTypeList:[],
        oneDetail:{},
        auditName:'',
        delId:'',
        props: {
              value: 'id',
              label:'deptName',
              children: 'deptList'
          },
        fileIds:[],
        headers:{},
        current:1,
        total:1,
        fileList: [],
        formData: {
          name:'',
          infoId:'',//信息系统名称
          auditDeptId:[],//被审计单位
          description:'',
        },
        formLabelWidth: '120px',
        dialogFormVisible:false,
        showdialogFormVisible:false,
        options: [],
        value:0,
        value1:[],
        tableData: []
      }
    },
    computed: mapState({
        loginInfo: state => state.loginInfo.user,
    }),
    mounted(){
        this.getLists()
        this.headers['Authorization'] = sessionStorage.getItem('accessToken')
    },
    methods:{
      downLoad(id){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('get', `/info/attachment/downloadFile?attachmentId=${id}`, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xmlhttp.setRequestHeader('Authorization', sessionStorage.getItem('accessToken'));
        xmlhttp.setRequestHeader('Access-Control-Expose-Headers', 'filename');
        xmlhttp.responseType = 'blob';
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var downloadUrl = window.URL.createObjectURL(xmlhttp.response);
            var anchor = document.createElement('a');
            anchor.href = downloadUrl;
            anchor.click();
            window.URL.revokeObjectURL(xmlhttp.response);
            let responseHeader = xmlhttp.getAllResponseHeaders()
            let index = responseHeader.indexOf("fileName=");
            let index2 = responseHeader.indexOf("connection");
            let fileName = responseHeader.substring(index+9,index2-1);
            anchor.download = fileName;

          }
        };
      },
      numToText(index){
        let a = '--'
        this.getBuildTypeList.forEach((i)=>{
            if(i.id == index){
              a = i.dictName
            }
        })
        return a
      },
      isDelete(id){
            this.$confirm('此操作将删除该审计信息, 是否继续?', '提示', {
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
      okDelete(id){
        console.log(id,'sss')
            this.$http('post',`/audit/delete/${id}`).then(res=>{
                if(res.code==200){
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getLists()
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
      changePage(index){
          //清空
          this.tableData = []
          this.current = index
          this.getLists()
        },
      showNewModal(){
        this.dialogFormVisible=true
        this.getDept()
      },
      fileSuccess(response){
        if(response.code==200){
          this.fileIds.push(response.id)
        }
      },
      searchHandle(){
        this.current = 1
        this.getLists()
      },
        getLists(){
            let obj ={
              currentPage:this.current,
              pageSize:10,
              auditName:this.auditName||'',
            }
            this.$http('get','/audit/list',{
                ...obj
            }).then((response)=>{
                this.tableData = response.data.page.records
                this.total = response.data.page.total
            })
            //获取信息系统名称
            this.$http("get", "/infoBasic/getInfoList").then(data => {
                this.getBuildTypeList = data.data.list;
            });
            

        },
        //获取部门/单位id
        getDept(){
            //获取主管部门
            this.$http("get", "/dept/getDeptTreeList").then(data => {
                // 为级联组件添加children
                this.DeptTreeList = data.data.list;
            })

        },
        saveOne(){
          if(!this.formData.name){
            this.$message.warning('审计报告名称不能为空')
            return
          }else if(!this.loginInfo.deptId&&!this.formData.auditDeptId){
            this.$message.warning('被审计单位不能为空')
            return
          }else if(!this.formData.infoId){
            this.$message.warning('信息系统名称不能为空')
            return
          }
          else if(this.fileIds.length==0){
            this.$message.warning('上传附件不能为空')
            return
          }
            let obj = {...this.formData}
            this.loginInfo.userType?obj.auditDeptId = obj.auditDeptId[obj.auditDeptId.length-1]:obj.auditDeptId = this.loginInfo.deptId
            obj.attachmentIds = this.fileIds.join(',')
            this.$http('post','/audit/save',{
                // name:'',
                // attachmentIds:'',//附件id，逗号隔开
                // infoId:'',//信息系统名称
                // auditDeptId:'',//被审计单位
                // description:'',
                ...obj,
                deptId:obj.auditDeptId
            }).then((response)=>{
              if(response.code==200){
                this.$message.success(response.msg)
                this.getLists()
                //模态框置空
                this.formData = {}
                this.fileIds = []
                this.dialogFormVisible = false
              }else{
                this.$message.warning(response.msg)
              }
            }).catch((err)=>{
                this.$message.warning(err.data.msg)

            })
        },
        handleItemChange(id) {
            console.log(this.formData.auditDeptId);
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
        showModal(index){
            console.log(index)
            this.$http('get',`/audit/info/${index}`).then((response)=>{
                if(response.code==200){
                  this.oneDetail = response.data.object
                }
            })
           this.showdialogFormVisible = true
        },
        formatter(row) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        handleRemove() {
          this.fileIds.forEach((item,index)=>{
            if(item===this.delId){
              this.fileIds.splice(index,1) 
            }
          })
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file) {
            this.delId = file.response.id
            return this.$confirm(`确定移除 ${ file.name }？`)

        }
    },
    
}
</script>

<style lang="less">
/* 在这里写css样式 */
/* 新建完了这个页面要去添加路由，在src/router.js里面添加，添加方法在readme里面 */
.special-audit{
    background-color: #ffffff;
    padding: 20px 10px;
    .table_style{
      width: 100%;
      margin-top:20px
    }
    .demo-form-inline .el-input,.demo-form-inline .el-select{
    width: 130px!important;
    }
}

</style>

