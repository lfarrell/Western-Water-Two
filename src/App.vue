<template>
  <div id="app">
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" ng-init="isCollapsed=true" ng-click="isCollapsed = !isCollapsed">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#/">Western Water (2000-2017)</a>
        </div>
        <div class="navbar-collapse" ng-class="{collapse: isCollapsed}">
          <ul class="nav navbar-nav">
            <li class="dropdown" dropdown on-toggle="toggled(open)">
              <a class="dropdown-toggle" dropdown-toggle href="#">Lower Colorado States<span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="#/arizona">Arizona</a></li>
                <li><a href="#/california">California</a></li>
                <li><a href="#/nevada">Nevada</a></li>
              </ul>
            </li>
            <li class="dropdown" dropdown on-toggle="toggled(open)">
              <a class="dropdown-toggle" dropdown-toggle href="#">Upper Colorado States<span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="#/colorado">Colorado</a></li>
                <li><a href="#/new_mexico">New Mexico</a></li>
                <li><a href="#/utah">Utah</a></li>
                <li><a href="#/wyoming">Wyoming</a></li>
              </ul>
            </li>
            <li class="dropdown" dropdown on-toggle="toggled(open)">
              <a class="dropdown-toggle" dropdown-toggle href="#">Pacific Northwest States<span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="#/idaho">Idaho</a></li>
                <li><a href="#/oregon">Oregon</a></li>
                <li><a href="#/washington">Washington</a></li>
              </ul>
            </li>
            <li><router-link to="/texas">Texas</router-link></li>
            <li><a href="#/about">About</a></li>
            <li><a href="http://www.deanfarr.com">Other Visuals</a></li>
          </ul>
        </div>
      </div>
    </div>
    <router-view></router-view>
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
