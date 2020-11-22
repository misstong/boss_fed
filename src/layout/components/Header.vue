<template>
	<div class="header">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>活动管理</el-breadcrumb-item>
			<el-breadcrumb-item>活动列表</el-breadcrumb-item>
			<el-breadcrumb-item>活动详情</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown>
			<span class="el-dropdown-link">
				<el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>用户id</el-dropdown-item>
				<el-dropdown-item divided @click.native="handleLogout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'
export default Vue.extend({
	name: 'Header',
	data () {
		return {
			userInfo: {}
		}
	},
	created () {
		// this.loaduserInfo()
	},
	methods: {
		async loaduserInfo () {
			const { data } = await getUserInfo()
			this.userInfo = data.userInfo
		},
		async handleLogout () {
			this.$confirm('logout?', 'hh', {
				confirmButtonText: 'OK',
				cancelButtonText: 'cancel'
			}).then(() => {
				this.$store.commit('setUser', null)
				this.$router.push('/login')
			}).catch(() => {
				this.$message.info('cancel logout')
			})
		}
	}
})
</script>
<style lang="scss" scoped>
.header
{
	height: 100%;
	align-items: center;
	display: flex;
	justify-content: space-between;
}
.el-dropdown-link{
	display: flex;
	align-items: center;
}
</style>
