<template>
	<div class="header">
		<span @click="toggleCollapse" class="toggle">
				<i v-if="!isCollapse" class="el-icon-s-fold"></i>
		    <i v-else class="el-icon-s-unfold"></i>
    </span>
		<el-breadcrumb separator-class="el-icon-arrow-right" class="breadCrumb">
			<el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.meta.fullName}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown class="userInfo">
			<span class="el-dropdown-link">
				<el-avatar :size="30" :src="userInfo.portrait"></el-avatar>
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
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
	props: {
		isCollapse: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			userInfo: {}
		}
	},
	created () {
		this.loaduserInfo()
	},
	mounted () {
		console.log('router', this.$route)
	},
	methods: {
		async loaduserInfo () {
			const { data } = await getUserInfo()
			this.userInfo = data.content
			console.log(this.userInfo)
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
		},
		toggleCollapse () {
			this.$emit('collapseToggle', !this.isCollapse)
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
	// justify-content: space-between;
}
.el-dropdown-link{
	display: flex;
	align-items: center;
}
.breadCrumb {
	margin-left: 5px;
}
.userInfo {
	margin-left: auto;
}
.header .toggle {
	cursor: pointer;
}
</style>
