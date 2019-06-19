<template>
 <!-- 信息系统基本情况 -->
    <div class="systemBasic">
        <div v-if="maintenance">
            <div>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="主管部门" prop="deptId">
                        <el-cascader
                        :options="DeptTreeList"
                        :props="defaultProps"
                        v-model="formInline.deptId"
                        change-on-select
                        clearable
                        size="mini"
                        >
                        </el-cascader>
                    </el-form-item>

                    <el-form-item label="网络类型">
                        <el-select v-model="formInline.belongNetwork" size="mini" clearable>
                            <el-option v-for="item in networkTypes" :value="item.id" :label="item.dictName" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="系统状态">
                        <el-select v-model="formInline.systemStatus" size="mini" clearable>
                            <el-option label="正在运行" value="0"></el-option>
                            <el-option label="暂停使用" value="1"></el-option>
                            <el-option label="终止使用" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="填报状态">
                        <el-select v-model="formInline.status" size="mini" clearable>
                            <el-option label="已提交" value="1"></el-option>
                            <el-option label="已保存" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input v-model="formInline.systemName" size="mini" placeholder="系统名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-table
                    ref="singleTable"
                    :data="tableData"
                    highlight-current-row
                    style="width: 100%"
                    :row-class-name="column_class"
                    >
                    <el-table-column
                    label="序号"
                    type="index"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    property="systemName"
                    label="信息系统名称"
                    >
                    </el-table-column>
                    <el-table-column
                    property="deptName"
                    label="主管部门"
                    >
                     <template slot-scope="scope">
                        {{scope.row.deptName||'--'}}
                    </template>
                    </el-table-column>
                    <el-table-column
                    property="belongNetwork"
                    label="网络类型"
                    >
                    <!-- <template slot-scope="scope">
                        {{networkTypeChange(scope.row.belongNetwork)}}
                    </template> -->
                    <template slot-scope="scope">
                        {{scope.row.belongNetwork||'--'}}
                    </template>
                    </el-table-column>
                    <el-table-column
                    property="phisicalLocation"
                    label="部署位置"
                    >
                    <template slot-scope="scope">
                        <div v-if="scope.row.phisicalLocation">
                            {{scope.row.phisicalLocation}}
                        </div>
                        <div v-else>--</div>
                    </template>
                    </el-table-column>
                    <el-table-column
                    property="onlineTime"
                    label="上线运行时间"
                     width="110">
                    <template slot-scope="scope">
                        <div v-if="scope.row.onlineTime">
                            {{scope.row.onlineTime|spliceTimeString}}
                        </div>
                        <div v-else>--</div>
                    </template>
                    </el-table-column>
                    <el-table-column
                    property="isMatchRes"
                    label="是否挂接资源"
                    width="110"
                    >
                    <template slot-scope="scope">
                        <div v-if="scope.row.isMatchRes=='Y'">
                            是
                        </div>
                        <div v-else-if="scope.row.isMatchRes=='N'">否</div>
                        <div v-else>--</div>
                    </template>
                    </el-table-column>
                    <el-table-column
                    property="systemStatus"
                    label="系统状态"
                    width="130">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.systemStatus" 
                        @change= saveStatus(scope.row.systemStatus,scope.row.id)
                        :disabled="scope.row.systemStatus==2">
                            <el-option v-for="i in statusList" :label="i.name" :value="i.value" :key="i.value" :disabled="i.value==-1"></el-option>
                        </el-select>
                    </template>
                    </el-table-column>
                    <el-table-column
                    property="status"
                    label="填报状态"
                    width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status==-1">--</div>
                        <div v-else-if="scope.row.status==0">已保存</div>
                        <div v-else-if="scope.row.status==1">已提交</div>
                        <div v-else>--</div>
                    </template>
                    </el-table-column>
                    
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="180">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
                            <el-button v-if="!(scope.row.status==1&&scope.row.systemStatus==2)" type="text" size="small" @click="updateDetails(scope.row.id)">完善信息</el-button>
                            <el-button type="text" size="small" @click="$router.push(`opsInfo/${scope.row.id}`)">运维信息</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 查看modal -->
                <el-dialog 
                append-to-body 
                title="查看" 
                :visible.sync="dialogVisible" 
                width="900px"
                custom-class="modalclass">
                    <el-dialog 
                    append-to-body 
                    title="查看运维信息" 
                    :visible.sync="innerVisible" 
                    width="900px">
                    <table class="modal_table">
                        <tr>
                            <td>系统状态</td>
                            <td>{{nowMessage.infoStatus||'--'}}</td>
                            <td>运维周期</td>
                            <td>{{nowMessage.period||'--'}}</td>
                        </tr>
                        <tr>
                            <td>本周期运维时间</td>
                            <td>{{nowMessage.periodStart||'--'}}至{{nowMessage.periodEnd||'--'}}</td>
                            <td>运维模式</td>
                            <td>{{nowMessage.model||'--'}}</td>
                        </tr>
                        <!-- <tr>
                            <td>是否挂接资源</td>
                            <td v-if="nowMessage.isMatchRes=='Y'">是</td>
                            <td v-else-if="nowMessage.isMatchRes=='N'">否</td>
                            <td v-else>--</td>
                        </tr> -->
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

                    <div class="inside_title">信息系统基本情况</div>
                    <table class="modal_table">
                        <tr>
                            <td>信息系统名称</td>
                            <td>{{nowRow.systemName||'--'}}</td>
                            <td>主管部门</td>
                            <td>{{nowRow.deptName||'--'}}</td>
                        </tr>
                        <tr>
                            <td>功能描述</td>
                            <td>{{nowRow.systemDesc||'--'}}</td>
                        </tr>
                        <tr>
                            <td>承载业务名称</td>
                            <td>{{nowRow.businessName||'--'}}</td>
                            <td>网络类型</td>
                            <td>{{networkTypeChange(nowRow.belongNetwork)||'--'}}</td>
                        </tr>
                        <tr>
                            <td>是否挂接资源</td>
                            <td v-if="nowRow.isMatchRes=='Y'">是</td>
                            <td v-else-if="nowRow.isMatchRes=='N'">否</td>
                            <td v-else>--</td>
                        </tr>
                        <tr>
                            <td>部署位置</td>
                            <td>{{nowRow.phisicalLocation||'--'}}</td>
                            <td>存在形态</td>
                            <td>{{nowRow.existModel||'--'}}</td>
                        </tr>
                        <tr>
                            <td>访问地址</td>
                            <td>{{nowRow.url||'--'}}</td>
                            <td>上线运行时间</td>
                            <td>{{nowRow.onlineTime||'--'}}</td>
                        </tr>
                        <tr>
                            <td>数据库名称及版本</td>
                            <td>{{nowRow.dbMessage||'--'}}</td>
                            <td>用户范围</td>
                            <td>{{nowRow.coverScope||'--'}}</td>
                        </tr>
                        <tr>
                            <td>数据来源</td>
                            <td>{{nowRow.dataResource||'--'}}</td>
                            <td>数据产生方式</td>
                            <td>{{nowRow.dataType||'--'}}</td>
                        </tr>
                        <tr>
                            <td>数据更新频率</td>
                            <td>{{nowRow.dataFrequency||'--'}}</td>
                            <td>管理机构</td>
                            <td>{{nowRow.managerOrg||'--'}}</td>
                        </tr>
                        <tr>
                            <td>管理机构联系人</td>
                            <td>{{nowRow.managerName||'--'}}</td>
                            <td>管理机构联系人电话</td>
                            <td>{{nowRow.managerPhone||'--'}}</td>
                        </tr>
                        <tr>
                            <td>承建单位名称</td>
                            <td>{{nowRow.constructionName||'--'}}</td>
                            <td>承建单位联系电话</td>
                            <td>{{nowRow.constructionPhone||'--'}}</td>
                        </tr>
                        <tr>
                            <td>资金来源</td>
                            <td>{{nowRow.fundsResource||'--'}}</td>
                            <td>实际投入金额</td>
                            <td v-if="nowRow.finalFunds>0||nowRow.finalFunds==0">{{nowRow.finalFunds}}元</td>
                            <td v-else>--</td>
                        </tr>
                        <tr>
                            <td>保存时间</td>
                            <td>{{nowRow.saveTime||'--'}}</td>
                            <td>提交时间</td>
                            <td>{{nowRow.submitTime||'--'}}</td>
                        </tr>
                    </table>
                    
                    <div class="inside_title">运维情况</div>
                    <el-table
                        ref="singleTable"
                        :data="nowRow.infoOperList"
                        highlight-current-row
                        style="width: 95%;margin:0 auto"
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
                        property="periodStart"
                        label="本周期运维时间"
                        width="180">
                        <template slot-scope="scope">
                            <div v-if="scope.row.periodStart && scope.row.periodEnd">
                                {{scope.row.periodStart}}至{{scope.row.periodEnd}}
                            </div>
                            <div v-else>--</div>
                        </template>
                        </el-table-column>
                        
                        <el-table-column
                        property="companyName"
                        label="运维单位">
                        </el-table-column>
                        <el-table-column
                        property="cost"
                        label="运维费用"
                        width="120">
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
                                <el-button @click="handleinnerClick(scope.row.id)" type="text" size="small">查看运维信息</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 表哥 -->
                </el-dialog>
                <!-- 完善modal -->
                <el-dialog 
                custom-class="modalclass" 
                title="完善信息系统基本情况" 
                :visible.sync="dialogupdateVisible" 
                class="demoDialog"  
                width="900px"
                 >
                    <div style="margin-bottom:20px"><i class="el-icon-warning"></i>请填报“非涉密信息系统”基本情况</div>
                    <el-form 
                    :inline="true" 
                    :model="updateForm" 
                    :rules="rules" 
                    ref="ruleForm"
                    >
                         <el-form-item label="信息系统名称" :label-width="formLabelWidth" prop="systemName">
                            <!-- <el-select v-model="updateForm.systemName" disabled size="small">
                                <el-option disabled label="区域一" value="shanghai"></el-option>
                            </el-select> -->
                            <el-input v-model="updateForm.systemName" disabled autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item prop="deptName" label="主管部门" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.deptName" disabled autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item  prop="systemDesc" label="功能描述" :label-width="formLabelWidth" class="textareaW">
                            <el-input v-model="updateForm.systemDesc" disabled autocomplete="off"  type="textarea" :rows="2" size="small"></el-input>
                        </el-form-item>
                        <el-form-item  prop="businessName" label="承载业务名称" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.businessName" placeholder="请输入承载业务名称" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item  prop="belongNetwork" label="网络类型" :label-width="formLabelWidth">
                            <!-- <el-input v-model="updateForm.belongNetwork" disabled autocomplete="off" size="small"></el-input> -->
                            <el-select v-model="updateForm.belongNetwork" size="mini" disabled> 
                                <el-option v-for="item in networkTypes" :value="item.id" :label="item.dictName" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item  prop="isMatchRes" label="是否挂接资源" :label-width="formLabelWidth">
                            <el-radio label="Y" style="width:60px;" v-model="updateForm.isMatchRes" >是</el-radio>
                            <el-radio label="N" style="width:120px;" v-model="updateForm.isMatchRes" >否</el-radio>
                        </el-form-item>
                        <el-form-item prop="name" label="网络类型" :label-width="formLabelWidth" style="visibility:hidden;margin:0">
                            <el-input v-model="updateForm.name" disabled autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item  prop="phisicalLocation" label="部署位置" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.phisicalLocation" disabled autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item  label="存在形态" :label-width="formLabelWidth">
                            <el-select multiple v-model="existModel" placeholder="请选择存在形态" size="small">
                                <el-option v-for="i in allModal" :label="i.dictName" :value="i.id" :key="i.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  prop="url" label="访问地址" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.url" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item prop="onlineTime" label="上线运行时间" :label-width="formLabelWidth">
                            <div class="block">
                                <el-date-picker
                                v-model="updateForm.onlineTime"
                                type="date"
                                placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item prop="dbMessage" label="数据库名称及版本" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.dbMessage" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item prop="coverScope" label="用户范围" :label-width="formLabelWidth">
                            <el-select v-model="updateForm.coverScope" placeholder="请选择用户范围" size="small">
                                <el-option v-for="item in allCoverList" :label="item.dictName" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="dataResource" label="数据来源" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.dataResource" autocomplete="off" size="small"></el-input>
                        </el-form-item> 
                        <el-form-item prop="dataType" label="数据产生方式" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.dataType" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item prop="dataFrequency" label="数据更新频率" :label-width="formLabelWidth">
                            <el-select v-model="updateForm.dataFrequency" placeholder="选择数据更新频率" size="small">
                                <el-option v-for="i in allFrequenceList" :label="i.dictName" :value="i.id" :key="i.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="managerOrg" label="管理机构" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.managerOrg" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item prop="managerName" label="管理机构联系人" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.managerName" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item prop="managerPhone" label="管理机构联系人电话" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.managerPhone" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item prop="constructionName" label="承建单位名称" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.constructionName" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item prop="constructionPhone" label="承建单位联系电话" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.constructionPhone" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item prop="fundsResource" label="资金来源" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.fundsResource" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item prop="finalFunds" label="实际投入金额" :label-width="formLabelWidth">
                            <!-- <el-input v-model="updateForm.finalFunds" autocomplete="off" size="small"></el-input>
                            元 -->
                            <el-input-number v-model="updateForm.finalFunds" :precision="2" :min="0" :step="100" size="small" style="width:250px;"></el-input-number>元

                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogupdateVisible = false" size="small">取 消</el-button>
                        <el-button type="primary" @click="onsave" size="small" style="margin-left:30px;">保 存</el-button>
                        <el-button type="primary" @click="onok('ruleForm')" size="small" style="margin-left:30px;">提 交</el-button>
                    </div>
                </el-dialog>

                <!-- 新增运维信息 -->
                <el-dialog title="新增运维信息" @close="getData()" :visible.sync="dialogFormVisible" class="demoDialog"  width="900px">
                    <el-form :inline="true" :model="opsForm">
                         <el-form-item label="系统状态" :label-width="formLabelWidth">
                            <el-select v-model="opsstatus" disabled size="small">
                                <el-option v-for="i in statusList" :label="i.name" :value="i.value" :key="i.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="运维周期" :label-width="formLabelWidth" class="sec_select">
                            <!-- <el-input v-model="opsForm.period" style="width:100px" size="small" ></el-input> -->
                            <el-input-number v-model="opsForm.period" :step="1" :min="0" style="width:120px" size="small"></el-input-number>
                            <el-select  v-model="opsForm.periodUnit" size="small" style="width:100px" >
                                <el-option label="年" value="Y" ></el-option>
                                <el-option label="月" value="M" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="本周期运维时间" :label-width="formLabelWidth">
                            <el-date-picker
                                v-model="valueTime"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>   
                        </el-form-item>
                        <el-form-item label="运维模式" :label-width="formLabelWidth">
                            <el-select v-model="opsForm.model" placeholder="请选择运维模式" size="small">
                                <el-option  v-for="i in allModal" :label="i.dictName" :value="i.id" :key="i.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="运维费用" :label-width="formLabelWidth">
                            <el-input-number v-model="opsForm.cost" :precision="2" :min="0" :step="100" size="small" style="width:250px;"></el-input-number>元
                            <!-- <el-input v-model="opsForm.cost" placeholder="请输入运维费用" autocomplete="off" size="small"></el-input> -->
                        </el-form-item>
                        <el-form-item label="运维费来源" :label-width="formLabelWidth">
                            <el-input v-model="opsForm.costSource" placeholder="请输入运维费来源" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="运维单位名称" :label-width="formLabelWidth">
                            <el-input v-model="opsForm.companyName" placeholder="请输入运维单位名称" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="运维单位联系人" :label-width="formLabelWidth">
                            <el-input v-model="opsForm.contactName" placeholder="请输入运维单位联系人" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="运维单位联系电话" :label-width="formLabelWidth">
                            <el-input v-model="opsForm.contactPhone" placeholder="请输入运维单位联系电话" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                         <el-form-item label="与运维单位是否签订运维保密协议" :label-width="formLabelWidth" class="lineLabel">
                                <el-radio v-model="opsForm.isSecret" label="Y">是</el-radio>
                                <el-radio v-model="opsForm.isSecret" label="N">否</el-radio>
                        </el-form-item>
                        <el-form-item label="暂停使用时间" :label-width="formLabelWidth">
                            <!-- <el-input v-model="opsForm.stopTime" placeholder="请输入暂停使用时间" autocomplete="off" size="small"></el-input>
                             -->
                             <el-date-picker
                            v-model="opsForm.stopTime"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="暂停使用原因" :label-width="formLabelWidth" class="textareaW">
                            <el-input v-model="opsForm.stopReason" placeholder="请输入暂停使用原因" autocomplete="off"  type="textarea" :rows="2" size="small"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="getData(),dialogFormVisible = false" size="small">取 消</el-button>
                        <el-button type="primary" @click="onOpsOk" size="small" style="margin-left:30px;">确 定</el-button>
                    </div>
                </el-dialog>

            </div>
            <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="changePage"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { stringify } from 'querystring';
import { formatDate } from '../../util/date.js';
export default {
    name:'systemBasic',
    data(){
        return{
        routeId:'',
        DeptTreeList:[],
        defaultProps:{
            children: 'childs',
            label: 'deptName',
            value: 'id'
         },
        deptNameTree:false,

        rules: {
          businessName: [
            { required: true, message: '请输入承载业务名称', trigger: 'blur' },
          ],
          isMatchRes: [
            { required: true, message: '是否挂接资源', trigger: 'change' }
          ],
        //   existModel: [
        //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        //   ],
          url: [
            {required: true, message: '请输入访问地址', trigger: 'blur' }
          ],
          onlineTime: [
            { required: true, message: '请选择上线运行时间', trigger: 'change' }
          ],
          dbMessage: [
            { required: true, message: '请选择数据库信息', trigger: 'blur' }
          ],
          coverScope: [
            { required: true, message: '请选择用户范围', trigger: 'change' }
          ],
          dataResource: [
            { required: true, message: '请填写数据来源', trigger: 'blur' }
          ],
          dataType: [
            { required: true, message: '请填写数据产生方式', trigger: 'blur' }
          ],
          dataFrequency: [
            { required: true, message: '请选择数据更新频率', trigger: 'change' }
          ],
          managerOrg: [
            { required: true, message: '请填写管理机构', trigger: 'blur' }
          ],
          managerName: [
            { required: true, message: '请填写联系人', trigger: 'blur' }
          ],
          managerPhone: [
            { required: true, message: '请填写联系人电话', trigger: 'blur' }
          ],
          constructionName: [
            { required: true, message: '请填写承建单位名称', trigger: 'blur' }
          ],
          constructionPhone: [
            { required: true, message: '请填写联系电话', trigger: 'blur' }
          ],
          fundsResource: [
            { required: true, message: '请填写资金来源', trigger: 'blur' }
          ],
          finalFunds: [
            { required: true, message: '请填写具体金额', trigger: 'blur' }
          ],

        },
        nowId:'',
        opsstatus:2,
        valueTime:[],
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
        existModel: [],
        allCoverList:[],
        allFrequenceList:'',
            allModal:[],
            optionsDept: [],
            innerVisible:false,
            nowRow:{},
            nowMessage:{},
            formInline: {
                deptId:[],
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
            opsForm:{
                stopTime:'',
            },
            updateForm: {
                systemName:'',
                belongDept:'',
                systemDesc:'',
                businessName:'',
                belongNetwork:'',
                isMatchRes:'',
                phisicalLocation:'',
                existModel:'',
                url:'',
                onlineTime:'',
                dbMessage:'',
                coverScope:'',
                dataResource:'',
                dataType:'',
                dataFrequency:'',
                managerOrg:'',
                managerName:'',
                managerPhone:'',
                constructionName:'',
                constructionPhone:'',
                fundsResource:'',
                finalFunds:'',
                },
            formLabelWidth: '200px',
            value1: '',
            radio:1,
            dialogupdateVisible:false
            }
    },
    filters:{
        spliceTimeString(index){
           return index.substring(0,10)
        }
    },
    methods:{
        //页面所有的方法写在这里
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
            if(!this.opsForm.period){
                this.$message.warning('请输入运维周期')
                return
            }else if(!this.opsForm.periodUnit){
                this.$message.warning('请输入运维周期后的单位')
                return
            }else if(!this.valueTime.length){
                this.$message.warning('请输入运维时间')
                return
            }else if(!this.opsForm.model){
                this.$message.warning('请输入运维模式')
                return
            }else if(!this.opsForm.cost){
                this.$message.warning('请输入运维费用')
                return
            }else if(!this.opsForm.costSource){
                this.$message.warning('请输入运维费来源')
                return
            }else if(!this.opsForm.companyName){
                this.$message.warning('请输入运维单位名称')
                return
            }else if(!this.opsForm.contactName){
                this.$message.warning('请输入运维单位联系人')
                return
            }else if(!this.opsForm.contactPhone){
                this.$message.warning('请输入运维单位电话')
                return
            }else if(!this.opsForm.isSecret){
                this.$message.warning('请选择是否签订保密协议')
                return
            }else if(!this.opsForm.stopTime){
                this.$message.warning('请选择暂停时间')
                return
            }

            let infoOper = this.opsForm
            infoOper.periodStart = formatDate(this.valueTime[0], 'yyyy-MM-dd hh:mm:ss');
            infoOper.periodEnd = formatDate(this.valueTime[1], 'yyyy-MM-dd hh:mm:ss');
            infoOper.stopTime = formatDate(infoOper.stopTime, 'yyyy-MM-dd hh:mm:ss');
            this.$http('post',`/infoOper/save`,{
                ...infoOper,
                infoId:this.nowId,
                infoStatus:2
            }).then(res=>{
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.dialogFormVisible = false
                    // 保存后modal框全部清空，仅保留状态
                    this.opsForm = {}
                    this.valueTime =[]
                    this.getData()
                }else{
                    this.$message.warning(res.msg)
                }
            })
        },
        saveStatus(status,id){
            if(status==2){
                this.$confirm('信息系统终止使用，请填写“终止使用”运维信息后，以确认终止使用。', '提示', {
                confirmButtonText: '去填写',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.nowId = id
                    this.dialogFormVisible = true
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
            })

            this.dialogupdateVisible = true
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
    
    mounted(){
        this.getDept()
        this.getList()
        this.getModel()
        this.getcoverList()
        this.getFrequenceList()

        this.routeId = this.$route.params.id
        if(this.routeId){
            this.updateDetails(this.routeId)
        }
        this.getData();//一定要在这里调用

    }
}
</script>

<style lang="less">
.systemBasic{
    background-color: #e6ebef;
    .el-dialog__body{
        padding:0
    }
}
.systemBasic > div>div{
    padding: 0 10px;
    background-color: #ffffff;
}
.systemBasic > div>div:nth-child(1){
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
.systemBasic .el-form-item{
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
    .deptName_class{
    position: relative;
    }
    .deptNameTree_class{
        position:absolute;
        z-index: 10;
        background-color:#ffffff;
        padding: 10px 0; 
        box-shadow: 1px 1px 10px #cccccc;
    }
}
.modalclass{
    margin-top:0px!important;
}
.el-table .grey_Line{
    background:#ccc;
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

