<template>
 <!-- 工作计划 -->
    <div class="work-plan">
        <el-form>
            <el-form-item label="部门" label-width="40px" prop="auditDeptId">
                        <div>
                            {{loginInfo.deptName||'--'}}
                        </div>
                    </el-form-item>
        </el-form>

          <el-table
            ref="Table"
            :data="workSettingList"
            border
            style="width: 100%">
            <el-table-column
            align='center'
            prop="workName"
            label="工作名称"
            >
            </el-table-column>
            <el-table-column
            align='center'
            prop="planTime"
            label="计划时间"
            width="400"
            >
            <template slot-scope="scope">
                <!-- slot-scope="scope" -->
                <!-- <el-tag
                :type="scope.row.tag === '家' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.tag}}</el-tag> -->
                <el-date-picker
                v-model="scope.row.planTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="updateList(scope.$index)">
                </el-date-picker>
            </template>
            </el-table-column>
            <el-table-column
            align='center'
            prop="days"
            label="所需时长（含节假日）">
                <template slot-scope="scope">
                    <div v-if="scope.row.planTime">
                        <!-- {{scope.row}} -->
                        {{(new Date(scope.row.planTime[1])-new Date(scope.row.planTime[0]))/86400000||'--'}}
                    </div>
                    <div v-else>
                        --
                    </div>
                </template>
            </el-table-column>
             <el-table-column
            align='center'
            prop="status"
            label="状态"
            width="180"
            >
            <template slot-scope="scope">

                <el-select 
                v-model="scope.row.status" 
                :disabled="scope.row.status == 1"
                @change="completeStatus(scope.$index,scope.row.status)">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                </el-option>
            </el-select>
            </template>
           
            </el-table-column>
             <el-table-column
            align='center'
            prop="finishTime"
            label="实际完成时间"
            width="180">
            <template slot-scope="scope">
                <div v-if="scope.row.finishTime">
                {{scope.row.finishTime.substr(0,10)||'--'}}
                </div>
                <div v-else>
                --
                </div>
            </template>
            </el-table-column>
        </el-table>

        <el-dialog @close="getAll()" :visible.sync="dialogFormVisible" width="400px" title="操作提醒">
                
        <el-form :model="form" >
             <el-alert
                title="选择完成时间后，表示系统建设完成，不能再更改状态。"
                type="warning"
                show-icon>
            </el-alert>
            <el-form-item label="请选择完成时间" label-width="120px" style="margin-top:20px">
                <el-date-picker
                :clearable = 'false'
                v-model="form.completeTime"
                type="date">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="okComplete()">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
// import { stringify } from 'querystring';
import { mapState } from 'vuex';
export default {
    name:'workPlan',
    data(){
        return{
        formData:{
            auditDeptId:[]
        },
        nowStatusIndex:'',
        form:{
            completeTime:new Date(),
        },
        dialogFormVisible:false,
        workSettingList:[],
        optionsDept: [],
        props: {
              value: 'id',
              label:'deptName',
              children: 'deptList'
        },
        options: [{
          value: -1,
          label: '未开始'
        }, {
          value: 0,
          label: '进行中'
        }, {
          value: 1,
          label: '已完成'
        }],
        value:0,
        }
    },
    computed: mapState({
        loginInfo: state => state.loginInfo.user,
    }),
    methods:{
        onCancel(){
                this.getAll()
                this.dialogFormVisible = false

        },
        completeStatus(index,sta){
            if(this.workSettingList[index].status===1){
                this.nowStatusIndex = index
                this.dialogFormVisible = true
            }else if(sta!=undefined&&this.workSettingList[index].status!=1){
                this.updateList(index,sta)
            }
        },
        okComplete(){
            let startTime = parseInt(new Date(this.workSettingList[this.nowStatusIndex].planTime[0]).valueOf()/100000000)
            let completeTime = parseInt(new Date(this.form.completeTime).valueOf()/100000000)
            if(startTime>completeTime){
                this.$message.warning('完成时间不能小于开始时间')
            }else{
                this.updateList(this.nowStatusIndex,1,this.form.completeTime)
                this.dialogFormVisible = false
            }
        },
        getAll(){
            this.$http('get','/workPlan/getWorkSettingList').then((response)=>{
                if(response.code==200){
                    this.workSettingList = response.data.object.map((item)=>{
                        if(!item.workStart || !item.workEnd){
                            item.planTime= []
                        }else{
                            item.planTime = [item.workStart,item.workEnd]
                        }
                        if(item.status==null){
                            item.status = -1
                        }
                        return item
                    })
                }
            }).catch((err)=>{
                this.$message.warning(err.data.msg)
            })
        },
        GMTToStr(time){
            let date = new Date(time)
            let Str=date.getFullYear() + '-' +
            (date.getMonth() + 1) + '-' + 
            date.getDate() + ' ' + 
            date.getHours() + ':' + 
            date.getMinutes() + ':' + 
            date.getSeconds()
            return Str
        },
        updateList(index,sta,finishTime){
            if(!this.workSettingList[index].planTime){
                return
            }
            this.workSettingList[index].days = (new Date(this.workSettingList[index].planTime[1])-new Date(this.workSettingList[index].planTime[0]))/86400000
            if(sta!=undefined)  this.workSettingList[index].status = sta
            let finish = ''
            finishTime ? finish = this.GMTToStr(finishTime) : finish = this.workSettingList[index].finishTime
            // finishTime ? finish = this.GMTToStr(finishTime) : finish = 0

            this.$http('post',`/workPlan/insertOrUpdateWorkPlan`,{
                days: this.workSettingList[index].days,
                deptId: this.workSettingList[index].deptId,
                id: this.workSettingList[index].id,
                status: this.workSettingList[index].status,
                workEnd: this.GMTToStr(this.workSettingList[index].planTime[1]),
                workId: this.workSettingList[index].workId,
                workStart: this.GMTToStr(this.workSettingList[index].planTime[0]),
                finishTime: finish
            }).then((response)=>{
                if(response.code==200){
                    this.$message.success(response.msg)
                    this.getAll()
                }else{
                    this.$message.warning(response.msg)
                }
            }).catch((err)=>{
                this.$message.warning(err.data.msg)
                this.getAll()
                
            })
        },
    },
    mounted(){
        this.getAll()
    }
}
</script>

<style lang="less">
/* 在这里写css样式 */
/* 新建完了这个页面要去添加路由，在src/router.js里面添加，添加方法在readme里面 */
.work-plan{
    background-color: #ffffff;
    padding: 20px 10px;
    .demo-form-inline .el-input,.demo-form-inline .el-select{
    width: 130px!important;
}
}

</style>

