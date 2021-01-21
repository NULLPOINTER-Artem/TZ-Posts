<template>
    <div class="container">
        <SlideShowComponent v-bind:post="post"/>
        <div class="desc-author" v-if="post.description">
            <div class="desc">
                <p>
                    {{ post.description }}
                </p>
            </div>
            <div class="author">
                <p>Author: {{ post.firstName }} {{ post.lastName }}</p>
            </div>
        </div>
        <div class="author-alt" v-else>
            <p>Author: {{ post.firstName }} {{ post.lastName }}</p>
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
    .container {
        font-family: cursive;
        margin: 40px auto 0 auto;
        width: 80%;
    }
    
    @media only screen and (max-width: 600px){
        .container {
            font-size: 70%;
        }
        .desc-author {
            margin-top: 5px;
        }
    }

    @media only screen and (max-width: 200px){
        .container {
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

    .author-alt {
        padding-top: 5%;
        text-align: center;
    }

    .author p::first-line .author-alt > p::first-line {
        text-transform: capitalize;
    }
</style>