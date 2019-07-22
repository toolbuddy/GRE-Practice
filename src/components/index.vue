<template>
  <div id="index">
    <NavBar v-bind:mode="mode"/>
    <b-container class="wrapper">
      <h1 id="title">{{mode.charAt(0).toUpperCase() + mode.slice(1)}}</h1>
      <b-container id="content" class="wrapper">
        <h2>
          Select a question 
          <router-link 
            :to="`/practice-${mode}`"
            exact
            tag="b-button"
            id="start-button"
            variant="success"
            v-if="questionId != -1"
          >Start practice</router-link>
        </h2>
        <b-form id="filter-form" @submit.stop.prevent>
          <b-input type="text" id="filter-input" v-model="filter" placeholder="Enter keywords to filter, or leave blank"/>
          <b-button id="random-button" variant="info" @click="randomQuestion(filteredQuestions)">Random</b-button>
        </b-form>
        <b-list-group id="questionList">
          <b-list-group-item 
            v-for="(question) in filteredQuestions" 
            :active="questionId == question.id" 
            :key="question.id"
            @click="selectQuestion(question.id)"
            style="border-radius:0;"
            class="flex-column align-items-start">
            <p class="mb-1" v-html="question.description.length > 200 ? question.description.substr(0, 200) + '...' : question.description"></p>
          </b-list-group-item>
        </b-list-group>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import NavBar from './NavBar';
import {mapState} from 'vuex';
import store from '../store';

export default {
  name: "Index",
  props: ['mode', 'questions'],
  components: {
    NavBar
  },
  data(){
    return {
      filter: "",
    }
  },
  computed: {
    ...mapState({
      questionId: 'questionId',
    }),
    filteredQuestions(){
      let parentThis = this; 
      return this.questions.filter(value => {
        return value.description.includes(parentThis.filter) || value.intent.includes(parentThis.filter);
      })
    }
  },
  methods: {
    selectQuestion(id){
      store.commit('selectQuestion', id);
    },
    randomQuestion(questions){
      store.commit('selectQuestion', questions[Math.floor(Math.random() * questions.length)].id);
    }
  },
}
</script>

<style lang="scss">
body{
  background-color: #373A3C;
}
#index{
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
#title{
  margin: 0.5em 0;
}
.wrapper{
  max-height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
#content{
  max-height: calc(100% - 5.5em);
}
#filter-form{
  display: flex;
  margin: 1rem 0;
}
#random-button{
  white-space: nowrap;
  margin-left: 0.5rem;
}
#start-button{
  float: right;
  padding: 0.375rem 1.5rem;
  background-color: #28a745;
  border-color: #28a745;
}
#questionList{
  color: #373A3C;
  overflow: auto;
  flex-grow: 1;
  margin-bottom: 1em;
}
</style>