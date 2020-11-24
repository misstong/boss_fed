<template>
    <el-card>
        <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="广告位名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
    </el-form>
    </el-card>
    
</template>
<script lang="ts">
import Vue from 'vue'
import { saveOrUpdate, getSpaceById } from '@/services/advert-space'

export default Vue.extend({
    data () {
        return {
            form: {
                name: '',
                id: undefined
            }
        }
    },
    props: {
        id: {
            type: Number
        },
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    created () {
        this.loadAd()
    },
    methods: {
        async onSubmit () {
            console.log('')
            try {
                const { data } = await saveOrUpdate(this.form)
                if (data.success) {
                    this.$message.success('添加成功')
                }
            } catch (e) {

            }
        },
        async loadAd () {
            if (this.isEdit) {
                try {
                    const { data } = await getSpaceById(this.id)
                    if (data.success) {
                        this.form.name = data.content.name
                        this.form.id = data.content.id
                    }
                } catch (e) {

                }    
            }
        }
    }
})
</script>
