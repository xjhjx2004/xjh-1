<template>
  <Menu v-show="!inMd"/>
  <Header v-show="currentRoute != 'Home'"/>
    <div class="col-24 row" ref="main">
      <!-- <Sidebar class="col-md-0 sideBar" :class="[{ 'col-1': !toggleSidebar }, { 'col-3': toggleSidebar }]" ref="sideBarRef"
        v-show="currentRoute != 'Home'"/> -->
      <router-view class="col-20 col-md-24 offset-md-0 main" 
        :class="[{ 'offset-0': toggleSidebar },{ 'offset-1': !toggleSidebar },{'full-content': !sidebarAppear}]" />
    </div>
</template>

<script setup lang="ts">
import Header from "@/components/header.vue"
import Menu from "./components/menu.vue";
// import Sidebar from "./components/sidebar.vue";
import { RouterView } from 'vue-router'
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useStatusStore } from '@/use'
import { currentRoute } from "@/main"
import { useElementSize } from '@vueuse/core';
const main = ref()
const { height } = useElementSize(main)

watch(height , () =>{
  stateStore.updateHeadings();
})

const stateStore = useStatusStore()
const sideBarRef = ref();
const { width } = useElementSize(sideBarRef)
const { toggleSidebar, sidebarAppear, inMd } = storeToRefs(stateStore)

watch(width, () => {
  stateStore.SidebarAppear(width.value == 0)
})
</script>

<style lang="scss">
@import "./style/col.scss";
@import "./style/content.scss";
</style>

<style lang="scss" scoped>
.sideBar , .main{
  transition: width 0.5s ease-in-out, margin-left 0.5s ease-in-out;
}
</style>
