<template>
    <div class="login">
        <el-form ref="form"
          label-position="top"
          :model="form" label-width="80px"
          :rules="rules"
          :isLoading="isLoading">
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
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
import { login } from '@/services/user'
import { Form } from 'element-ui'

export default Vue.extend({
    name: 'Login',
    methods: {
      async onSubmit () {
          try {
            await (this.$refs.form as Form).validate()
            this.isLoading = true
            // const { data } = await request({
            //     url: '/front/user/login',
            //     headers: { 'content-type': 'x-www-form-urlencoded' },
            //     data: qs.stringify(this.form)
            // })
            console.log('form', this.form)
            const { data } = await login(this.form)
            
            if (data.state !== 1) {
                this.$message.error(data.message)
            } else {
                this.$store.commit('setUser', data.content)
                this.$router.push(this.$route.query.redirct as string || '/')
                this.$message.success('登录成功')
            }
          } catch (e) {

          }
        this.isLoading = false
      }
    },
    data () {
        return {
            form: {
                phone: '18201288771',
                password: '111111'
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ]
            },
            isLoading: false
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
