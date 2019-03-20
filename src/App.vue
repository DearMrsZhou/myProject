<template>
  <div class="myApp">
    <transition enter-active-class="animated flipInY" leave-active-class="animated flipOutY">
    <router-view/>
    </transition>
  </div>
</template>

<script>



export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import "assets/animate.css";
.myApp{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}
</style>
