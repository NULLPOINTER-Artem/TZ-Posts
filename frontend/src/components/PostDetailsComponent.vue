<template>
    <div>
        <SlideShowComponent v-bind:post="post"/>
        <p>
            {{ post.description }}
        </p>
        <p>Author: {{ post.firstName }} {{ post.lastName }}</p>
    </div>
</template>

<script>
import PostService from './../PostService.js';
import SlideShowComponent from './SlideShowComponent.vue';

export default {
    name: 'PostDetailsComponent',
    components: {
        SlideShowComponent
    },
    data() {
        return {
            post: {},
            slideIndex: 0,
        };
    },
    methods: {
        sendImage(filename) {
            return PostService.getImage(filename);
        },
    },
    async created() {
        this.post = await PostService.getPostById(this.$route.params.postId);
    },
}
</script>

<style scoped>
    p {
        color: blue;
        margin-top: 40px;
        text-align: center;
    }
</style>