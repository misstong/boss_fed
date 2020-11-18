<template>
  <div id="app">
      <el-button>默认按钮</el-button>
      <div class="text">hhh</div>
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
// @import '~@/styles/variables.scss';

.text{
  color: $success-color
}
</style>
