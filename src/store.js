import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    questionId: -1,
  },
  mutations:{
    selectQuestion: (state, questionId) => {
      state.questionId = questionId;
    }
  },
})

export default store;