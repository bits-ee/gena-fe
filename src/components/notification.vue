<template>
    <div>
        <div ref="alert" class="alert alert-dismissible fade" :class="{'alert-danger':is_error, 'alert-success':!is_error, 'show':show, 'd-none':!show}">
            <strong>{{message}}</strong>
            <button v-on:click="hide" class="btn-close"></button>
        </div>
    </div>
</template>
<script lang="ts">
import { mapGetters, mapMutations } from 'vuex';
import { defineComponent } from 'vue'
export default defineComponent({
    computed:{
        ...mapGetters('notification', [
            'show',
            'message',
            'is_error'
        ])
    },
    methods:{
        ...mapMutations('notification', [
            'hide'
        ])
    }
})
</script>
