<template>
    <el-container>
        <el-aside width="200px">
          <Aside/>
        </el-aside>
        <el-container>
          <el-header>
            <Header/>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'

export default Vue.extend({
  name: 'Layout',
  components: {
    Aside,
    Header
  }
})
</script>
<style lang="scss" scoped>
.el-container {
  min-height: 100vh;
  min-width: 980px;
}

.el-aside {
    background-color: #D3DCE6;
}
.el-main {
    background-color: #E9EEF3;
}
.el-header{
    background-color: #fff;

}

</style>
