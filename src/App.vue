<template>
  <div id="app">
    <b-navbar toggleable type="inverse" variant="inverse" fixed="top">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-link class="navbar-brand" to="/">
        <span>Western Water (2000-2017)</span>
      </b-link>
      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar>
          <b-nav-item-dropdown text="Lower Colorado States">
            <b-dropdown-item to="/arizona">Arizona</b-dropdown-item>
            <b-dropdown-item to="/california">California</b-dropdown-item>
            <b-dropdown-item to="/nevada">Nevada</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Upper Colorado States">
            <b-dropdown-item to="/colorado">Colorado</b-dropdown-item>
            <b-dropdown-item to="/new_mexico">New Mexico</b-dropdown-item>
            <b-dropdown-item to="/utah">Utah</b-dropdown-item>
            <b-dropdown-item to="/wyoming">Wyoming</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Pacific Northwest States">
            <b-dropdown-item to="/oregon">Oregon</b-dropdown-item>
            <b-dropdown-item to="/washington">Washington</b-dropdown-item>
            <b-dropdown-item to="/wyoming">Wyoming</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/texas">Texas</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item to="http://www.deanfarr.com">Other Visuals</b-nav-item>
        </b-nav>

      </b-collapse>
    </b-navbar>
    <router-view v-cloak></router-view>
    <div class="col-offset-sm-1 col-sm-10" v-cloak>
      <p>If you have any questions or comments feel free to contact me via Twitter at @farrelldlfarrel, or email
        at farrelldlfarrell at gmail.com</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
