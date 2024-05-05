<template>
  <top_menu></top_menu>
  <div class="main_content">
    <router-view></router-view>
  </div>
</template>

<script>
import top_menu from '@/components/header/header'
export default {
  components: {
    top_menu
  }
}
</script>

<style>
@import "@/assets/css/common.css";
@import "@/assets/css/style.css";
</style>
