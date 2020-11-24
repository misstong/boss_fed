<template>
    <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px" :inline="true">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select
              v-model="form.categoryId"
              placeholder="请选择资源分类"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in resourceCategories"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              :disabled="isLoading"
            >查询搜索</el-button>
            <el-button
              @click="onReset"
              :disabled="isLoading"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="operation">
        <el-button @click="showAddDialog">添加</el-button>
        <el-button @click="$router.push({
          name: 'resourceCategory'
        })">资源分类</el-button>
      </div>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
      >
        <el-table-column
          type="index"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          width="180"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          width="180"
          label="描述">
        </el-table-column>
        <el-table-column
          width="180"
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
    <el-dialog  :visible.sync="dialogVisible" title="添加资源">
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addResource">确 定</el-button>
          </div>
          <el-form :model="resourceForm"
           class="demo-form-inline"
            label-position="left"
             label-width="80px">
          <el-form-item label="资源名称">
            <el-input v-model="resourceForm.name"></el-input>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-input v-model="resourceForm.url"></el-input>
          </el-form-item>
          <el-form-item label="资源分类">
            <el-select v-model="resourceForm.categoryId">
              <el-option :label="resourceCate.name" :value="resourceCate.id"
               v-for="resourceCate in resourceCategories"
               :key="resourceCate.id" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="resourceForm.description"></el-input>
          </el-form-item>
        </el-form> 
    </el-dialog>  
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getResourcePages, saveOrUpdate } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'

// todo create edit delete
export default Vue.extend({
    data () {
        return {
            resources: [],
            form: {
                name: '',
                url: '',
                current: 1,
                size: 5,
                categoryId: null
            },
            totalCount: 0,
            resourceCategories: [],
            isLoading: true,
            dialogVisible: false,
            resourceForm: {
              name: '',
              categoryId: 0,
	            url: '',
	            description: ''
            }
        }
    },
    created () {
        this.loadResources()
        this.loadResourceCategories()
    },
    methods: {
        async loadResourceCategories () {
            const { data } = await getResourceCategories()
            this.resourceCategories = data.data
        },
        showAddDialog () {
          this.dialogVisible = true
        },
        async addResource () {
          try {
            const { data } = await saveOrUpdate(this.resourceForm)
            if (data) {
              this.dialogVisible = false
              this.$message.success('添加成功')
            }
          } catch (e) {
            this.$message.error(e)
          }
        },
        async loadResources () {
            this.isLoading = true
            const { data } = await getResourcePages(this.form)
            this.resources = data.data.records
            this.totalCount = data.data.total
            this.isLoading = false
        },

        onSubmit () {
            this.form.current = 1
            this.loadResources()
        },

        handleEdit (item: any) {
            console.log('handleEdit', item)
        },

        handleDelete (item: any) {
            console.log('handleDelete', item)
        },

        handleSizeChange (val: number) {
            this.form.size = val
            this.form.current = 1
            this.loadResources()
        },

        handleCurrentChange (val: number) {
            this.form.current = val
            this.loadResources()
        },

        onReset () {
            (this.$refs.form as Form).resetFields()
            this.form.current = 1
            this.loadResources()
        }
    }
})
</script>
<style lang="scss" scoped>
.operation {
  margin-bottom: 10px;
}
</style>
