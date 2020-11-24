<template>
    <div>
        <add-or-update :id='id' :isEdit="true"/>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import AddOrUpdate from './AddOrUpdate.vue'
export default Vue.extend({
    components: {
        AddOrUpdate
    },
    props: {
        id: {
            type: Number
        }
    }
})
</script>
