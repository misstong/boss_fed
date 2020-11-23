<template>
    <el-card>
        <div slot="header">
            <el-steps :active="activeStep">
                <el-step
                    :title="step.title"
                    :icon='step.icon'
                    :key="step.title"
                    @click.native="activeStep = index"
                    v-for="(step, index) in steps"></el-step>
            </el-steps>
            <el-form label-width="80px">
                <div v-show="activeStep===0">
                    <el-form-item label="课程名称">
                        <el-input v-model="course.courseName"></el-input>
                    </el-form-item>
                    <el-form-item label="课程简介">
                        <el-input v-model="course.brief"></el-input>
                    </el-form-item>
                    <el-form-item label="课程概述">
                        <el-input
                            style="margin-bottom: 10px"
                            v-model="course.previewFirstField"
                            type="textarea"
                            placeholder="概述1"
                        ></el-input>
                        <el-input
                            v-model="course.previewSecondField"
                            type="textarea"
                            placeholder="概述2"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="讲师姓名">
                        <el-input v-model="course.teacherDTO.teacherName"></el-input>
                    </el-form-item>
                    <el-form-item label="讲师简介">
                        <el-input v-model="course.teacherDTO.description"></el-input>
                    </el-form-item>
                    <el-form-item label="课程排序">
                        <el-input-number
                            v-model="course.sortNum"
                            label="描述文字"
                        ></el-input-number>
                    </el-form-item>
                </div>
                <div v-show="activeStep===1">
                    <el-form-item label="课程封面">
                        <course-image
                            v-model="course.courseListImg"
                            :limit="5"
                        />
                    </el-form-item>
                    <el-form-item label="介绍封面">
                        <course-image
                            :limit="5"
                            v-model="course.courseImgUrl"
                        />
                    </el-form-item>
                </div>
                <div v-show="activeStep===2">
                    <el-form-item label="售卖价格">
                        <el-input v-model.number="course.discounts" type="number">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品原价">
                        <el-input v-model.number="course.price" type="number">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="销量">
                        <el-input v-model.number="course.sales" type="number">
                            <template slot="append">单</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="活动标签">
                        <el-input v-model="course.discountsTag"></el-input>
                    </el-form-item>
                </div>
                <div v-show="activeStep===3">
                     <el-form-item label="限时秒杀开关">
                        <el-switch
                            v-model="course.activityCourse"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                        >
                        </el-switch>
                    </el-form-item>
                    <template v-if="course.activityCourse">
                    <el-form-item label="开始时间">
                        <el-date-picker
                        v-model="course.activityCourseDTO.beginTime"
                        type="date"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM-dd"
                        />
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-date-picker
                        v-model="course.activityCourseDTO.endTime"
                        type="date"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM-dd"
                        />
                    </el-form-item>
                    <el-form-item label="秒杀价">
                        <el-input v-model.number="course.activityCourseDTO.amount" type="number">
                        <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="秒杀库存">
                        <el-input v-model.number="course.activityCourseDTO.stock" type="number">
                        <template slot="append">个</template>
                        </el-input>
                    </el-form-item>
                    </template>
                </div>
                <div v-show="activeStep===4">
                    <el-form-item label="课程详情">
                        <text-editor v-model="course.courseDescriptionMarkDown" />
                    </el-form-item>
                    <el-form-item label="是否发布">
                    <el-switch
                        v-model="course.status"
                        :active-value="1"
                        :inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    />
                    </el-form-item>
                    <el-form-item>
                    <el-button
                        type="primary"
                        @click="handleSave"
                    >保存</el-button>
                    </el-form-item>
                </div>
                <el-form-item v-if="activeStep >= 0 && activeStep < 4">
                    <el-button @click="activeStep++">下一步</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>
<script lang="ts">
import Vue from 'vue'
import {
  saveOrUpdateCourse,
  getCourseById
} from '@/services/course'
import moment from 'moment'
import CourseImage from './CourseImage.vue'
import TextEditor from '@/components/TextEditor/index.vue'

export default Vue.extend({
    name: 'CreateOrUpdate',
    components: {
        CourseImage,
        TextEditor
    },
    props: {
        isEdit: {
        type: Boolean,
        default: false
        },
        courseId: {
        type: [String, Number]
        }
    },
     created () {
        if (this.isEdit) {
            this.loadCourse()
        }
    },
    data () {
        return {
            activeStep: 0,
            steps: [
                { title: '基本信息', icon: 'el-icon-edit' },
                { title: '课程封面', icon: 'el-icon-edit' },
                { title: '销售信息', icon: 'el-icon-edit' },
                { title: '秒杀活动', icon: 'el-icon-edit' },
                { title: '课程详情', icon: 'el-icon-edit' } 
            ],
            course: {
                    courseName: '',
                    brief: '',
                    teacherDTO: {
                    teacherName: '',
                    teacherHeadPicUrl: '',
                    position: '',
                    description: ''
                },
                courseDescriptionMarkDown: '',
                price: 0,
                discounts: 0,
                priceTag: '',
                discountsTag: '',
                isNew: true,
                isNewDes: '',
                courseListImg: '',
                courseImgUrl: '',
                sortNum: 0,
                previewFirstField: '',
                previewSecondField: '',
                status: 0,
                sales: 0,
                activityCourse: false,
                activityCourseDTO: {
                    beginTime: '',
                    endTime: '',
                    amount: 0,
                    stock: 0
                },
                autoOnlineTime: ''
            }
        }
    },
    methods: {
        async handleSave () {
            const { data } = await saveOrUpdateCourse(this.course)
            if (data.code === '000000') {
                this.$message.success('保存成功')
                this.$router.push('/course')
            } else {
                this.$message.error('保存失败')
            }
        },
        async loadCourse () {
            const { data } = await getCourseById(this.courseId)
            const { activityCourseDTO } = data.data
            if (activityCourseDTO) {
                activityCourseDTO.beginTime = moment(activityCourseDTO.beginTime).format('YYYY-MM-DD')
                activityCourseDTO.endTime = moment(activityCourseDTO.endTime).format('YYYY-MM-DD')
            }
            this.course = data.data
        }
    }
})
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
</style>
