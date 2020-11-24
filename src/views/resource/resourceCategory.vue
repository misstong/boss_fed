<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <el-button @click="dialogVisible = true">添加</el-button>
            </div>
            <el-table
                :data="resourceCategory"
                style="width: 100%">
                <el-table-column
                type="index"
                width="50">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="createdTime"
                    label="创建时间"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="sort"
                    label="排序">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-button @click="handleDelete(scope.row.id)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form :inline="true" :model="categoryForm" class="demo-form-inline">
                <el-form-item label="名称">
                    <el-input v-model="categoryForm.name"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="categoryForm.sort"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getResourceCategories, saveOrUpdate, deleteCategory } from '@/services/resource-category'

export default Vue.extend({
    data () {
        return {
            resourceCategory: [],
            dialogVisible: false,
            categoryForm: {
                sort: 0,
                name: '',
                id: null
            }
        }
    },
    created () {
        this.loadResourceCategories()
    },
    methods: {
        async loadResourceCategories () {
            try {
                const { data } = await getResourceCategories()
                this.resourceCategory = data.data
            } catch (e) {
                
            }     
        },
        handleEdit (row: any) {
            console.log(row)
            this.categoryForm.name = row.name
            this.categoryForm.id = row.id
            this.categoryForm.sort = row.sort
            this.dialogVisible = true
        },
        async handleAdd () {
            console.log(this.categoryForm)
            try {
                const { data } = await saveOrUpdate(this.categoryForm)
                if (data.data) {
                    this.$message.success('添加成功')
                    this.dialogVisible = false
                    this.loadResourceCategories()
                }
            } catch (e) {

            }
        },
        async handleDelete (id: number) {
            try {
                const { data } = await deleteCategory(id)
                if (data.data) {
                    this.$message.success('删除成功')
                    this.loadResourceCategories()
                }
            } catch (e) {

            }
        }

    }
})
</script>
