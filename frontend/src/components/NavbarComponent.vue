<template>
    <div class="navbar">
        <nav>
            <div class="home">
                <router-link tag="a" to="/">estate</router-link>
            </div>

            <ul>
                <li>
                    <router-link tag="a" to="/postForm">post form</router-link>
                </li>
                <li>
                    <router-link tag="a" to="/posts">list of posts</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>   

<script>

export default {
    name: 'NavbarComponent',
    methods: {
    },
}
</script>

<style scoped>
    .navbar {
        background: #444;
        border-radius: 50px 0 50px 0;
    }

    .home {
        justify-self: start;
        text-align: center;
        padding: 20px 35px 20px 35px;

        border-right: 2px solid #444;
        border-radius: 0 10px 10px 0;

        animation-name: push;
        animation-duration: 7s;
        animation-iteration-count: infinite;

        position: relative;
    }

    .home a {
        display: block;
        color: #444;
        text-transform: uppercase;
        text-decoration: none;

        transition: all 250ms;
    }

    @keyframes push {
        0% {left: 40px; top: 0px;}
        25% {left: 0px; top: 0px;}
        50% {left: 40px; top: 0px;}
        75% {left: 0px; top: 0px;}
        100% {left: 40px; top: 0px;}
    }

    .home a:hover {
        color: blanchedalmond;
        padding-left: 45%;
    }

    .home a::before {
        content: '';
        display: block;
        width: 100%;
        background-color: #444;

        position: absolute;
        top: 0;
        left: 0;
        height: 0%;

        border-radius: 0 10px 10px 50px;

        opacity: .5;

        transition: all 250ms;
    }

    .home a:hover::before {
        height: 100%;
    }

    nav {
        background: #55d6aa;
        border-radius: 0 50px 0 50px;

        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: 1fr;
    }

    nav ul {
        list-style: none;
        justify-self: end;
        padding-top: 20px;
        padding-right: 20px;
    }

    nav ul li {
        display: inline-block;
        padding-left: 15px;
    }

    nav ul li a {
        color: #444;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 14px;

        transition: all 1s;
    }

    nav ul li a:hover {
        color: blanchedalmond;
        background: #444;
        border-radius: 8px;
        padding: 7px;
    }
</style>