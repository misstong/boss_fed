<template>
    <div class="login">
        <el-form ref="form"
          label-position="top"
          :model="form" label-width="80px">
            <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'
import qs from 'qs'

export default Vue.extend({
    name: 'Login',
    methods: {
      async onSubmit () {
        // console.log('submit!')
        const res = await request({
            url: '/front/user/login',
            headers: { 'content-type': 'x-www-form-urlencoded' },
            data: qs.stringify(this.form)
        })
        console.log(res)
      }
    },
    data () {
        return {
            form: {
                phone: '',
                password: ''
            }
        }
    }
})
</script>
<style lang="scss" scoped>
.login{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form{
        width: 300px;
        background: white;
        padding: 20px;
        border-radius: 5px;
    }
}
</style>
