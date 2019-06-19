<template>
  <div id="app"> 
    <router-view/>
  </div>
</template>

<style lang="less">
html,body{
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #E8ECF0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
} 
.flexBox{
  display: flex;
  height: 100%
}
.flexItem{
  flex: 1;
  overflow: scroll;
}
.main{
  min-height: 550px;
  text-align: left;
}
*{
  margin: 0;
  padding: 0;
}
.el-pagination{
  text-align: right;
  padding: 25px 5px!important;
}
.el-dialog__header{
  background-color: #0f2140;
}
.el-dialog__title{
  color: #ffffff!important;
  font-size: 16px!important;
}
</style>
