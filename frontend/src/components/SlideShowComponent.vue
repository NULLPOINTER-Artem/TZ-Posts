<template>
  <div class="slideshow-container">
    <div class="slide-side fade"
      v-for="image in post.files"
      v-bind:key="image"
    >
      <img v-bind:src="sendImage(image.filename)" alt="error">
    </div>

    <a class="prev" @click="pushSlide(-1)">&#10094;</a>
    <a class="next" @click="pushSlide(1)">&#10095;</a>
  </div>
</template>

<script>
  import PostService from './../PostService.js';

  export default {
    props: {
      post: Object
    },
    data() {
      return {
        slideIndex: 1,
      }
    },
    methods: {
      showSlideshow(index) {
        this.$nextTick(() => {
          let slides = document.querySelectorAll('.slide-side');

          if (index > slides.length) {this.slideIndex = 1;}
          if (index < 1) {this.slideIndex = slides.length;}

          for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
          }

          slides[this.slideIndex - 1].style.display = "block";
        });
      },
      pushSlide(dir) {
        this.showSlideshow(this.slideIndex = this.slideIndex + dir);
      },
      sendImage(filename) {
        return PostService.getImage(filename);
      },
    },
    updated() {
      this.$nextTick(function () {
        this.showSlideshow(this.slideIndex);
      })
    }
  }
</script>

<style scoped>
  .fade {
    -webkit-animation-name: fade;
    -webkit-animation-duration: 2s;
    animation-name: fade;
    animation-duration: 2s;
  }

  @-webkit-keyframes fade {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  @keyframes fade {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  .slideshow-container {
    position: relative;
    max-width: 600px;
    max-height: 400px;
    margin: 0 auto;
  }

  .slide-side {
    display: none;
  }

  @media only screen and (max-width: 600px) {
    .slide-side > img {
      width: 100%;
      height: calc(100% / 2)
    }
  }

  img {
    margin-top: 20px;
    width: 600px;
    height: 400px;
    border-radius: 50px;
  }

  .prev {
    cursor: pointer;
    color: #fff;
    position: absolute;
    top: 45%;
    left: 1%;
  }

  .next {
    cursor: pointer;
    color: #fff;
    position: absolute;
    top: 45%;
    left: 97%;
  }
</style>