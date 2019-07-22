<template>
  <div id="practice">
    <NavBar v-bind:mode="mode"/>
    <b-container class="wrapper">
      <h1 id="title">{{mode.charAt(0).toUpperCase() + mode.slice(1)}} Practice</h1>
      <b-container id="content" class="wrapper">
        <b-row>
          <span id="question" v-html="questions.find(question => question.id == questionId) ? questions.find(question => question.id == questionId).description : '' "></span>
          <i id="intent" v-html="questions.find(question => question.id == questionId) ? questions.find(question => question.id == questionId).intent : '' "></i>
        </b-row>
        <b-row id="option-row">
          <b id="word-count">Word count: {{wordCount}} &nbsp; Time: {{practiceInterval}} &nbsp;
            <b-button variant="primary" @click="toggleTimer">{{timer ? "Stop" : "Start"}}</b-button>
            <b-button v-if="!timer" variant="danger" @click="resetTimer">Reset</b-button>
          </b>
          <b-button v-if="timer" variant="success" @click="finishPractice">Finish practice</b-button>
        </b-row>
        <b-row id="answer-wrapper">
          <textarea id="answer-input" v-model="answer"></textarea>
        </b-row>
      </b-container>
    </b-container>
    <b-modal
      id="finish-modal"
      title="Practice Finished"
      :visible="finished"
      @hide="closeModal"
    >
      <b>Word count: {{wordCount}}</b><br/>
      <b>Time: {{practiceInterval}}</b><br/>
      <div slot="modal-footer" class="w-100">
        <b-button class="finish-modal-button" variant="secondary" @click="closeModal"> Close </b-button>
        <b-button class="finish-modal-button" variant="primary" @click="exportDocx"> Export Word(.docx) </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import NavBar from './NavBar';
import {mapState} from 'vuex';
import { setInterval, clearInterval } from 'timers';
import JSZip from 'jszip';
import {getBinaryContent} from 'jszip-utils';
import DocxTemplater from 'docxtemplater';
import {saveAs} from 'file-saver';

export default {
  name: "Practice",
  props: ['mode', 'questions'],
  data(){
    return {
      answer: "",
      interval: 0,
      timer: null,
      finished: false,
    }
  },
  components: {
    NavBar
  },
  computed: {
    ...mapState({
      questionId: 'questionId',
    }),
    wordCount(){
      return this.answer ? this.answer.trim().replace(/(\s+|[^\w-]+)/g, " ").trim().split(' ').length : 0;
    },
    practiceInterval(){
      return `${Math.floor(this.interval / 3600)}:${Math.floor(this.interval % 3600 / 60)}:${this.interval % 60}`
    }
  },
  methods: {
    toggleTimer(){
      if(this.timer){
        clearInterval(this.timer);
        this.timer = null;
      }else{
        this.timer = setInterval((() => {
          this.interval++;
        }).bind(this), 1000);
      }
    },
    resetTimer(){
      this.interval = 0;
    },
    finishPractice(){
      if(this.timer){
        clearInterval(this.timer);
        this.timer = null;
      }
      this.finished = true;
    },
    closeModal(){
      this.finished = false;
    },
    exportDocx(){
      let parentThis = this;
      getBinaryContent("/template.docx", function(err, templateDocx){
        let nowDate = new Date();
        let questionObj = parentThis.$props.questions.find(question => question.id == parentThis.questionId);
        let objData = {
          mode: parentThis.$props.mode.charAt(0).toUpperCase() + parentThis.$props.mode.slice(1),
          date: `${nowDate.getMonth()+1}/${nowDate.getDate()}`,
          question: questionObj ? questionObj.description.replace(/<\/?p>/g,"") : '',
          intent: questionObj ? questionObj.intent.replace(/<\/?p>/g,"") : '',
          answer: parentThis.answer,
          wordCount: parentThis.answer ? parentThis.answer.trim().replace(/(\s+|[^\w-]+)/g, " ").trim().split(' ').length : 0,
          duration: `${Math.floor(parentThis.interval / 3600)}:${Math.floor(parentThis.interval % 3600 / 60)}:${parentThis.interval % 60}`,
        };
        let zip = new JSZip(templateDocx);
        let doc = new DocxTemplater().loadZip(zip);
        doc.setData(objData);
        doc.render();
        saveAs(doc.getZip().generate({
          type: "blob"
        }), `${parentThis.$props.mode}-${nowDate.getFullYear()}-${nowDate.getMonth()+1}-${nowDate.getDate()}.docx`);
      })
    }
  }
}
</script>

<style lang="scss">
body{
  background-color: #373A3C;
}
#practice{
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
#question{
  text-align: justify;
}
#intent{
  text-align: justify;
}
#answer-wrapper{
  flex-grow: 1;
  padding-bottom: 1rem;
}
#answer-input{
  width: 100%;
  height: 100%;
  resize: none;
  border-radius: 5px;
}
#word-count{
  line-height: 2.2em;
}
#option-row{
  justify-content: space-between;
  margin-bottom: 0.5em;
}
.finish-modal-button{
  float: right;
  margin-left: 0.5rem;
}
</style>