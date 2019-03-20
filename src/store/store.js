import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLogin: false,
  powerId: '',
  personInfo: {},
  level: [],
  level2:[]
}
const mutations = {
  updatePowerSync: function (state,obj) {
    state.isLogin = true
    state.powerId = obj.params.powerid
    state.personInfo = obj.params.personinfo
  },
  saveLevelS: (state,obj)=>{
    state.level = obj.firstMenuArr
    state.level2 = obj.secondMenuArr
  }

}
const actions={
  updatePowerAsync: function (context,obj) {
    context.commit('updatePowerSync',obj)
  },
  saveLevelA: (context,obj)=>{
    context.commit('saveLevelS',obj)
  }
}

const getters= {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
  // ,strict: true
})
