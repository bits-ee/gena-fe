<template>
    <div>
        <div class="avatar">
            <label v-if="avatar" class="edit-img" for="avatar-upload">
                <img src="../assets/images/edit.png" alt="">
            </label>
            <img class="avatar-img" :src="avatar_url" alt="User avatar">
            <div v-if="avatar" class="delete-img" v-on:click="DELETE_AVATAR">
                <img src="../assets/images/delete.png" alt="">
            </div>
            <label v-if="!avatar" for="avatar-upload" class="edit">
                +
            </label>
            <input class="d-none" id="avatar-upload" ref="avatar" type="file" @change="UPDATE($event.target.files[0])"/>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex';
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
        ...mapMutations('notification', [
            'notify',
            'notifyError'
        ]),
        UPDATE(file: File){
            this.UPDATE_AVATAR(file);
            (document.getElementById('avatar-upload') as HTMLInputElement).value = ''
        }
    }
})
</script>
<style scoped>
    .edit{
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        z-index: 20;
        background-color: rgba(0,0,0,0.5);
        opacity: 0;
        display: flex;
        justify-content: center;
        font-size: 115px;
        color: #fff;
    }
    .edit::selection{
        background: none;
    }
    .avatar:hover .edit, .edit-img:hover, .delete-img:hover{
        animation: edit-show linear 0.07s;
        animation-fill-mode: forwards;
        cursor: pointer;
    }
    .avatar{
        position: relative;
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
    .avatar-img{
        position: absolute;
        z-index: 0;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        object-fit: cover;
        border: solid black 2px;
    }
    .edit-img, .delete-img{
        position: absolute;
        cursor: pointer;
        height: 50%;
        width: 100%;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 60px;
        color: #fff;
        z-index: 10;
    }
    .edit-img{
        border: solid #1d8eea 2px;
        background-color: rgba(29,142,234, 0.5);
        border-radius: 100px 100px 0 0;
        top: 0;
        left: 0;
        
    }
    .delete-img{
        border: solid #af0007 2px;
        background-color: rgba(175,0,7, 0.5);
        border-radius: 0 0 100px 100px;
        top: 50%;
        left: 0;
    }
    .delete-img img, .edit-img img{
        width: 70px;
        height: 70px;
    }

    @keyframes edit-show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
