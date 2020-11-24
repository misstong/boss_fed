<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <el-button @click="$router.push({
                    name: 'addAdvertise'
                })">添加</el-button>
            </div>
            <el-table
                :data="adverts"
                style="width: 100%">
                <el-table-column
                prop="id"
                width="50">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="广告名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="spaceId"
                    label="广告位置"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="广告图片">
                    <template slot-scope="scope">
                        <img style="height: 80px" :src="scope.row.img"/>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="时间">
                </el-table-column>
                <el-table-column
                    label="上线/下线">
                    <template slot-scope="scope">
                        <el-switch
                            v-model='scope.row.status'
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="1"
                            :inactive-value="0"
                            @change="onChange(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="$router.push({
                            name: 'updateAdvertise',
                            params: {
                                id: scope.row.id
                            }
                            })">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getAll, updateStatus } from '@/services/advert'

export default Vue.extend({
    data () {
        return {
            adverts: []
        }
    },
    created () {
        this.loadAdverts()
    },
    methods: {
        async loadAdverts () {
            console.log('')
            try {
                const { data } = await getAll()
                if (data.success) {
                    this.adverts = data.content
                }
            } catch (e) {

            }
        },
        async onChange (status: any) {
            console.log('stua', status)
            try {
                const { data } = await updateStatus({ id: status.id, status: status.status })
                if (data.success) {
                    this.$message.success('更改成功')
                }
            } catch (e) {

            }
        },
        handleEdit (row: any) {
            console.log(row)
        },
        async handleAdd () {
            try {
               
            } catch (e) {

            }
        }
    
    }
})
</script>
