<template>
    <div id="avatar-container">
        <div v-if="avatar" class="avatar">
            <img id="avatar" class="avatar-img" :src="avatar_url" alt="User avatar" />
            <label id="avatar-upload-label" class="avatar-icon avatar-icon-edit" for="avatar-upload">
                <i class="bi-pencil"></i>
            </label>
            <div id="avatar-delete" class="avatar-icon avatar-icon-delete" v-on:click="DELETE_AVATAR">
                <i class="bi-x-lg"></i>
            </div>
        </div>
        <div v-else class="avatar">
            <img id="avatar-default" class="avatar-img" src="../assets/images/profile/avatar_default.jpg" alt="Default avatar" />
            <label id="avatar-add-label" class="avatar-icon avatar-icon-add" for="avatar-upload">
                <i class="bi-plus-lg"></i>
            </label>
        </div>
        <input class="d-none" id="avatar-upload" ref="avatar" type="file" @change="UPDATE($event.target.files[0])"/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex';
export default defineComponent({
    computed:{
        ...mapGetters('profile', [
            'avatar',
            'avatar_url'
        ])
    },
    methods: {
        ...mapActions('profile', [
            'UPDATE_AVATAR',
            'DELETE_AVATAR'
        ]),
        UPDATE(file: File){
            this.UPDATE_AVATAR(file);
            (document.getElementById('avatar-upload') as HTMLInputElement).value = ''
        }
    }
})
</script>
<style scoped>
    #avatar-container, .avatar {
        width: 200px;
        height: 200px;
        position: relative;
    }
    .avatar-img{
        border: solid #666 1px;
        z-index: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;        
    }
    .avatar-icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 60px;
        color: #fff;
    }
    .avatar-icon:hover{
        animation: opacity-transition linear 0.07s;
        animation-fill-mode: forwards;
        cursor: pointer;
    }
    .avatar-icon-edit, .avatar-icon-delete{
        height: 50%;
    }
    .avatar-icon-edit{
        border: solid #1d8eea 2px;
        background-color: rgba(29,142,234, 0.5);
        border-radius: 100px 100px 0 0;
        top: 0;
        left: 0;
    }
    .avatar-icon-delete{
        border: solid #af0007 2px;
        background-color: rgba(175,0,7, 0.5);
        border-radius: 0 0 100px 100px;
        top: 50%;
        left: 0;
    }
    .avatar-icon-add{
        height: 100%;
        border-radius: 50%;
        background-color: rgb(46, 234, 29, 0.5);
    }

    @keyframes opacity-transition {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
