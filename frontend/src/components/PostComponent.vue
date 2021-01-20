<template>
  <div>
    <div class="posts-container" v-if="posts">
      <router-link tag="div" :to="{name: 'postDetails', params: {postId: post._id}}" 
          class="post"
          v-for="post in posts"
          v-bind:key="post._id"
      >
      <img v-bind:src="sendImage(post.file.filename)" alt="error">
      <div class="pre-view-info">
        <div class="pre-view-info-heading">
          <p>{{ post.heading }}</p>
        </div>
        <div class="pre-view-info-address">
          <p>{{ post.country }}, {{ post.city }}, {{ post.zip }}</p>
        </div>
        <div class="pre-view-info-price">
          <p>{{ post.price }}$</p>
        </div>
      </div>
      </router-link>
    </div>
    <div class="notYet" v-if="!posts">
      <p>Posts not created yet <span class="dots">...</span></p>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService.js';

export default {
  name: 'PostComponent',
  data () {
    return {
      posts: [],
      error: '',
    }
  },
  methods: {
    sendImage(filename) {
      return PostService.getImage(filename);
    },
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch(err) {
      this.error = err.message;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .notYet {
    font-size: 30px;
    color: orange;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    margin-top: 10%;
  }

  .dots {
    position: relative;

    animation-name: dotsAnim;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  @keyframes dotsAnim {
    0% {left: -20px; right: 0;}
    25% {left: 0; right: 20px;}
    50% {left: -20px; right: 0;}
    75% {left: 0; right: 20px;}
    100% {left: -20px; right: 0;}
  }

  .posts-container {
    width: 100%;
    display: flex;
    flex-flow: row wrap;

    font-family: Times, Times New Roman, Georgia, serif;
  }

  .post {
    display: block;
    border: 2px solid #000;
    max-width: 200px;
    border-radius: 10px;

    margin: 5px;

    text-decoration: none;
    color: #000;

    transition: all 1s;
  }

  .post:hover {
    border: 2px solid #55d6aa;
  }

  .post:hover .pre-view-info-price {
    color: #66ff00;
  }

  .pre-view-info {
    display: block;
    text-align: center;
    padding-bottom: 30px;
    font-size: 14px;
  }

  .pre-view-info p {
    margin-top: 5px;
  }
  
  .pre-view-info-address {
    margin-top: 10px;
  }

  .pre-view-info-price {
    float: right;
    margin-right: 10px;
    margin-top: 5px;

    transition: all 1s;
  }

  img {
    width: 100%;
    height: 100px;
    border-radius: 10px 10px 0 0;
  }
</style>
