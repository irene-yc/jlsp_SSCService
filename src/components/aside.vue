<template>
    <div id="aside" :style="isCollapse?'width:70px':'200px'">
        <div class="sysName" v-if="!isCollapse">政务信息整合管理系统</div>
        <el-menu
        router
        :default-active="active"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#10183C"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        >
            <!-- <el-submenu index="1">
                <template slot="title">
                    <i class="iconfont iconxiangmujibenqingkuangsvg1"></i>
                    <span>项目基础情况</span>
                </template>
                <el-menu-item :index="'/basic/systemBasic'">信息系统基本情况</el-menu-item>
                <el-menu-item :index="'/basic/networkBasic'">行业专网基本情况</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="iconfont iconxiangmujianshejinzhan3"></i>
                    <span>项目建设进展</span>
                </template>
                <el-menu-item :index="'/basic/systemConstruction'">系统建设进展</el-menu-item>
                <el-menu-item :index="'/basic/networkIntegration'">专网整合进展</el-menu-item>
            </el-submenu>
            <el-menu-item :index="'/basic/specialAudit'">
                <i class="iconfont iconzhuanxiangshenji2"></i>
                <span slot="title">专项审计</span>
            </el-menu-item>
            <el-submenu index="4">
                <template slot="title">
                    <i class="iconfont icongongzuojianbao2"></i>
                    <span>工作简报</span>
                </template>
                <el-menu-item :index="'/basic/progressReport'">进度报表</el-menu-item>
                <el-menu-item :index="'/basic/workplan'">工作计划</el-menu-item>
            </el-submenu> -->
            <template v-for="item in treeMenus">
                <el-menu-item :key="item.id" v-if="item.children.length===0" :index="item.sysMenu.url">
                    <i :class="item.sysMenu.icon"></i>
                    <span>{{item.sysMenu.menuName}}</span>
                </el-menu-item>
                <el-submenu :key="item.id" v-else :index="item.sysMenu.id">
                    <template slot="title">
                        <i :class="item.sysMenu.icon"></i>
                        <span>{{item.sysMenu.menuName}}</span>
                    </template>
                    <el-menu-item
                    v-for="item2 in item.children"
                    :key="item2.sysMenu.id"
                    :index="item2.sysMenu.url"
                    >
                    {{item2.sysMenu.menuName}}
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
        <i class="iconfont iconshouqi" v-if="!isCollapse" @click="isCollapse=!isCollapse"></i>
        <i class="iconfont iconzhankai" v-if="isCollapse" @click="isCollapse=!isCollapse"></i>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'AsideAssembly',
    data(){
        return{
            isCollapse:false,//页面所有的数据写在这里
            active:'/basic/systemBasic'
        }
    },
    computed: mapState({
        // 箭头函数可使代码更简练
        treeMenus: state => state.loginInfo.treeMenus,
    }),
    methods:{
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    mounted(){
        this.active =this.$route.path
    }
}
</script>

<style>
/* 在这里写css样式 */
/* 新建完了这个页面要去添加路由，在src/router.js里面添加，添加方法在readme里面 */
#aside{
    background:linear-gradient(180deg,rgba(19,30,73,1) 0%,rgba(13,18,46,1) 100%);
    width: 200px;
    height: 100%;
    color: #ffffff;
    position: relative;
}
.el-submenu__title,.el-menu-item{
    text-align: left;
}
.el-menu{
    border-right: 1px solid #000!important;
}
.sysName{
    height:50px;
    font-size:14px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:60px;
    text-align: left;
    margin-left: 15px;
}
.el-submenu,.el-submenu__title,.el-menu-item{
    font-size: 13px!important;
}
.iconshouqi,.iconzhankai{
    font-size: 20px;
    cursor: pointer;
    position: fixed;
    bottom: 10px;
    left: 30px;
}
.iconfont{
    margin-right: 10px;
}
</style>

