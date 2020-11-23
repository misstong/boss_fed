<template>
    <div class="course-section">
        <el-card>
            <div class="card-header" slot="header">
                <!-- {{ course.courseName }} -->
                <el-button
                    type="primary"
                    @click="handleShowAddSection" 
                    >添加阶段</el-button>
            </div>
            <el-tree
             :data="data"
             :props="defaultProps"
             @node-click="handleNodeClick">
                <div class="inner" slot-scope="{ node, data }">
                    <span>{{node.label}}</span>
                    <span v-if="data.sectionName" class="actions">
                        <el-button>编辑</el-button>
                        <el-button type="primary">添加课时</el-button>
                        <el-select
                            class="select-status"
                            v-model="data.status"
                            placeholder="请选择">
                            <el-option label="已隐藏" :value="0"/>
                            <el-option label="待更新" :value="1"/>
                            <el-option label="已更新" :value="2"/>
                        </el-select>
                    </span>
                    <span v-else class="actions">
                        <el-button>编辑</el-button>
                        <el-button
                            type="success">上传视频</el-button>
                        <el-select
                            class="select-status"
                            v-model="data.status"
                            placeholder="请选择">
                            <el-option label="已隐藏" :value="0"/>
                            <el-option label="待更新" :value="1"/>
                            <el-option label="已更新" :value="2"/>
                        </el-select>
                    </span>
                </div>
             </el-tree>
        </el-card>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    // props:
    data () {
        return {
            data: [{
            label: '一级 1',
            children: [{
                label: '二级 1-1',
                children: [{
                label: '三级 1-1-1'
                }]
            }]
            }, {
            label: '一级 2',
            children: [{
                label: '二级 2-1',
                children: [{
                label: '三级 2-1-1'
                }]
            }, {
                label: '二级 2-2',
                children: [{
                label: '三级 2-2-1'
                }]
            }]
            }, {
            label: '一级 3',
            children: [{
                label: '二级 3-1',
                children: [{
                label: '三级 3-1-1'
                }]
            }, {
                label: '二级 3-2',
                children: [{
                label: '三级 3-2-1'
                }]
            }]
            }],
            defaultProps: {
            children: 'children',
            label: 'label'
            },
            course: {},
            sections: [],
            isAddSectionShow: false,
            isLoading: false
        }
    },
    methods: {
        handleNodeClick () {
            console.log('')
        },
        handleShowAddSection () {
            console.log('')
        }
    }
})
</script>

<style lang="scss" scoped>
.inner {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
      border-bottom: 1px solid #ebeef5;
  }
::v-deep .el-tree-node__content {
  height: auto;
}
.select-status {
  max-width: 100px;
  margin-left: 8px;
}
</style>
