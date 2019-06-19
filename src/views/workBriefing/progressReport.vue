<template>
 <!-- 工作计划 -->
    <div class="progress-report">
      部门：
      <el-cascader
            :options="DeptTreeList"
            :props="defaultProps"
            v-model="formData.auditDeptId"
            @change="current=1,getAll()"
            change-on-select
            clearable
            style="width:400px"
            >
            </el-cascader>
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
            prop="deptName"
            label="部门"
            >
            </el-table-column>
            <el-table-column
            align='center'
            prop="cardingWorkStatus"
            label="资源梳理工作状态">
            </el-table-column>
            <el-table-column
            align='center'
            prop="catalogWorkStatus"
            label="目录编制工作状态"
            >
            </el-table-column>
            <el-table-column
            align='center'
            prop="resourceWorkStatus"
            label="资源挂接工作状态"
            >
            </el-table-column>
             <el-table-column
            align='center'
            label="操作"
            width="180"
            >
            <template slot-scope="scope">
                <el-button type="text" @click="$router.push(`viewProgress/${scope.row.deptId}/${scope.row.deptStructureName}`)">查看详情</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="changePage">
      </el-pagination>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { stringify } from 'querystring';
export default {
    name:'progressReport',
    data(){
        return{
        DeptTreeList:[],
        defaultProps:{
            children: 'childs',
            label: 'deptName',
            value: 'id'
         },
        formData:{
            auditDeptId:[]
        },
        optionsDept: [],
        props: {
              value: 'id',
              label:'deptName',
              children: 'deptList'
        },
          current:1,
          total:null,
          options1: [
            {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }]
            }],

        options: [{
          value: 0,
          label: '未开始'
        }, {
          value: 1,
          label: '进行中'
        }, {
          value: 2,
          label: '已完成'
        }],
        value:0,
        value1:[],
          tableData: []
        }
    },
    methods:{
        getDept(){
          //获取主管部门
            this.$http("get", "/dept/getDeptTreeList").then(data => {
                // 为级联组件添加children
                this.DeptTreeList = data.data.list;
            })
        },
        changePage(index){
          //清空
          this.tableData = []
          this.current = index
          this.getAll()
        },
        getAll(){
          let params = {
            currentPage:this.current,
            deptId:this.formData.auditDeptId[this.formData.auditDeptId.length-1]||null,
            pageSize:10
          }
            this.$http('get',`/workPlan/selectDeptWorkBulletin?${stringify(params)}`).then((response)=>{
                if(response.code==200){
                  this.tableData = response.data.page.records
                  this.total = response.data.page.total
                }
            }).catch(()=>{

            })
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
        }
    },
    computed: mapState({
        loginInfo: state => state.loginInfo.user,
    }),
    mounted(){
        this.getAll()
        this.getDept()
    }
}
</script>

<style lang="less">
/* 在这里写css样式 */
/* 新建完了这个页面要去添加路由，在src/router.js里面添加，添加方法在readme里面 */
.progress-report{
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

