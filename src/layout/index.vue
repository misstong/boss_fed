<template>
    <el-container>
        <el-aside style="width:auto">
          <Aside :isCollapse="isCollapse"/>
        </el-aside>
        <el-container>
          <el-header>
            <Header @collapseToggle="collapseToggle" :isCollapse="isCollapse"/>
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
  data () {
    return {
      isCollapse: false
    }
  },
  components: {
    Aside,
    Header
  },
  methods: {
    collapseToggle (status: boolean) {
      this.isCollapse = status
    }
  }
})
</script>
<style lang="scss" scoped>
.el-container {
  min-height: 100vh;
  min-width: 980px;
}
::v-deep .aside .el-menu:not(.el-menu--collapse) {
  width: 200px;
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
