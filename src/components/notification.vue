<template>
    <div class="norification" ref="notification">
        <div ref="alert" class="alert alert-dismissible fade" :class="{'alert-danger':is_error, 'alert-success':!is_error, 'show':show, 'd-none':!show}">
            <strong>{{message}}</strong>
            <button v-on:click="clear" class="btn-close"></button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { defineComponent } from 'vue'
export default defineComponent({
    data(){
        return{
            timeout: null
        }
    },
    computed:{
        ...mapGetters('notification', [
            'show',
            'message',
            'is_error',
            'time'
        ])
    },
    methods:{
        ...mapMutations('notification', [
            'clear'
        ])
    },
    watch:{
        $route: function(newVal, oldVal){
            this.clear()
        },
        time: function(newVal, oldVal){
            if(this.timeout) clearTimeout(this.timeout)
            this.$refs['notification'].style.transition = "none"
            this.$refs['notification'].style.opacity = "1"
            setTimeout(()=>{
                this.$refs['notification'].style.transition = "opacity 0.7s ease 2.5s"
                this.$refs['notification'].style.opacity = "0"
            }, 10)
            this.timeout = setTimeout(()=>{
                this.clear()
            }, 3200)
        },
        
    }
})
</script>
<style scoped>
</style>
