<template>
    <div class="container">
        <SlideShowComponent v-bind:post="post"/>
        <div class="desc-author" v-if="post.description && (post.firstName && post.lastName)">
            <div class="desc">
                <p>
                    {{ post.description }}
                </p>
            </div>
            <div class="author">
                <p>Author: {{ post.firstName }} {{ post.lastName }}</p>
            </div>
        </div>
        <div v-else>
            <p>This post was created by not valid user! please do not agree with him.</p>
        </div>
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
    .desc-author {
        display: grid;
        margin: 40px auto 0 auto;
        width: 80%;
        font-family: cursive;
    }
    
    @media only screen and (max-width: 600px){
        .desc-author {
            font-size: 80%;
            margin-top: 5px;
        }
    }

    @media only screen and (max-width: 200px){
        .desc-author {
            font-size: 50%;
        }
    }

    .desc {
        padding: 15px;
    }

    .desc p::first-letter {
        font-size: 200%;
    }

    .desc p::first-line {
        text-indent: 2%;
    }

    .author p::first-line{
        text-transform: capitalize;
    }

    .author {
        justify-self: start;
    }
</style>