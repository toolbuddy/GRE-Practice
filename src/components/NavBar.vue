<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">GRE Practice</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link to="/argument" tag="b-nav-item" :active="mode == 'argument'">Argument</router-link>
        <router-link to="/issue"  tag="b-nav-item" :active="mode == 'issue'">Issue</router-link>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-button variant="outline-light">Helps</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  props: ['mode'],
}
</script>

<style lang="scss">
</style>