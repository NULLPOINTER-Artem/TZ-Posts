<template>
  <div class="posts-container">
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
  .posts-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }

  .post {
    border: 2px solid #000;
    width: 200px;
    border-radius: 10px;

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
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
  }

  .pre-view-info p {
    margin-top: 5px;
  }

  .pre-view-info-heading {
    justify-self: center;
  }

  .pre-view-info-address {
    justify-self: center;
  }

  .pre-view-info-price {
    justify-self: end;
    margin-right: 5px;

    transition: all 1s;
  }

  img {
    width: 198px;
    height: 100px;
    border-radius: 10px 10px 0 0;
  }
</style>
