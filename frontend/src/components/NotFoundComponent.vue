<template>
    <div class="container">
        <div class="alignMsg">
            <p>Oops! it is looking like this page is not found!</p>
            <router-link tag="a" to="/">Go Home</router-link>
        </div>
    </div>
</template>

<script>
/* This Not Found List */
export default {
    name: 'NotFoundComponent',
}
</script>

<style scoped>
    .container {
        margin: 0 auto;
        max-width: 350px;
        min-width: 50px;
        text-align: center;
    }

    .alignMsg p {
        color: orange;
    }

    .alignMsg a {
        display: block;
        text-decoration: none;
        color: teal;
        margin-top: 5px;
    }

    .container > .alignMsg {
        font-size: 103%;
        margin: 35% auto;
    }
</style>