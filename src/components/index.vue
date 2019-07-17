<template>
  <div id="index">
    <NavBar v-bind:mode="mode"/>
    <b-container>
      <h1 id="title">{{mode.charAt(0).toUpperCase() + mode.slice(1)}}</h1>
      <b-row>
        <b-col>
          <h2> <i class="step">1</i> Select a question</h2>
          <b-form id="filter-form" @submit.stop.prevent>
            <b-input type="text" id="filter-input" placeholder="Enter keywords to filter, or leave blank"/>
            <b-button id="random-button" variant="success">Random Pick</b-button>
          </b-form>
          <b-list-group>
            <b-list-group-item href="#" active class="flex-column align-items-start">
              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
              </p>
            </b-list-group-item>
            <b-list-group-item href="#" class="flex-column align-items-start">
              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
              </p>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col>
          <h2> <i class="step">2</i> Configure</h2>
          <b-container id="configure-wrapper">
            <b-form-checkbox
              id="timer-check"
              class="configure-check"
              value="timer"
              unchecked-value="no_timer"
            >
              Timer <input id="timer-time" type="time" />
            </b-form-checkbox>
            <b-form-checkbox
              id="count-check"
              class="configure-check"
              value="count"
              unchecked-value="no_count"
            >
              Word count
            </b-form-checkbox>
          </b-container>
        </b-col>
      </b-row>
      <b-row id="start-button-wrapper">
        <b-button id="start-button" variant="success">Start practice</b-button>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from './NavBar';

export default {
  name: "Index",
  props: ['mode'],
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
body{
  background-color: #373A3C;
}
#index{
  color: #fff;
}
#title{
  margin: 0.5em 0;
}
.step{
  font-style: normal;
  display: inline-block;
  width: 2em;
  height: 2em;
  border: 2px solid #5CB85C;
  border-radius: 1em;
  vertical-align: middle;
  text-align: center;
  line-height: calc(2em - 6px);
  color: #5CB85C;
  margin-right: 1em;
}
#filter-form{
  display: flex;
  margin: 1rem 0;
}
#random-button{
  white-space: nowrap;
  margin-left: 0.5rem;
}
#timer-check{
  margin-top: 1rem;
}
#configure-wrapper{
  padding: 0 6.5em;
}
.configure-check{
  margin-bottom: 1em;
}
#timer-time{
  border: none;
  border-radius: 4px;
}
#start-button{
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
#start-button-wrapper{
  display: flex;
  justify-content: center;
}
</style>