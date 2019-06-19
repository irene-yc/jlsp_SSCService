<template>
    <div id="aside" :style="isCollapse?'width:70px':'200px'">
        <!-- <div class="sysName" v-if="!isCollapse">政务信息整合管理系统</div> -->
        <el-menu
        router
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#10183C"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        >
            <el-menu-item :index="'/basic/index'">
                <i class="iconfont iconxiangmujibenqingkuangsvg1"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item :index="'/basic/user'">
                <i class="iconfont iconxiangmujianshejinzhan3"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
            <!-- <template v-for="item in treeMenus">
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
            </template> -->
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
            isCollapse:false//页面所有的数据写在这里
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
    // mounted(){
    //     console.log(this.loginInfo)
    // }
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

