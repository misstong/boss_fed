<template>
    <el-card>
        <el-form label-position="left" label-width="80px" :model="form" class="demo-form-inline">
            <el-form-item label="广告名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="广告位置">
                <el-select v-model="form.spaceId" placeholder="请选择">
                    <el-option
                        v-for="space in spaces"
                        :key="space.id"
                        :label="space.name"
                        :value="space.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
                 <el-date-picker
                    v-model="form.startTime"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="到期时间">
                <el-date-picker
                    v-model="form.endTime"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="上线/下线">
                <el-radio-group v-model="form.status">
                    <el-radio :label="0">下线</el-radio>
                    <el-radio :label="1">上线</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="广告图片">
                <course-image
                    v-model="form.img"
                    :limit="5"
                />
            </el-form-item>
            <el-form-item label="广告链接">
                <el-input v-model="form.link"></el-input>
            </el-form-item>
            <el-form-item label="广告备注">
                <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.text">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    
</template>
<script lang="ts">
import Vue from 'vue'
import { saveOrUpdate, getAdById } from '@/services/advert'
import CourseImage from './CourseImage.vue'

export default Vue.extend({
    components: {
        CourseImage
    },
    data () {
        return {
            form: {
                name: '',
                id: undefined,
                spaceId: 0,
                startTime: '',
                endTime: '',
                status: 0,
                img: '',
                link: '',
                text: ''
            },
            spaces: []
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
                    this.$router.push({
                        name: 'advert'
                    })
                }
            } catch (e) {

            }
        },
        async loadAd () {
            if (this.isEdit) {
                try {
                    const { data } = await getAdById(this.id)
                    if (data.success) {
                        this.form = data.content
                    }
                } catch (e) {

                }    
            }
        }
    }
})
</script>
