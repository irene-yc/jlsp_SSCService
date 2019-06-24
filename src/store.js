import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token:'',
    userInfo:{
      nickname: "",
      phone: "",
      username: "",
    },
    loginInfo:[],
    systemShowName:{},
    hostname:'http://114.116.34.164:8999/jl',
    // hostname:'/jl',
  },
  getters: {
    user(state){
      return state.userInfo
    },
    hostname(state){
      return state.hostname
    }
    

  },
  mutations: {
    setUserInfo(state,data){
      state.userInfo=data;
      // sessionStorage.setItem("user", JSON.stringify(data.user));
      // sessionStorage.setItem("accessToken", data.tokenMap.accessToken);
    },
    setloginInfo(state,data){
      state.loginInfo = data;
    },
    setSystemShowName(state,data){
      state.systemShowName = data;
    },
    LOGOUT (state){
      sessionStorage.clear();
      state.userInfo = {};
      // state.token = null
    }
  },
  actions:{

  }

})
