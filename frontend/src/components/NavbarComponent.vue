<template>
    <div class="navbar">
        <nav>
            <div class="home">
                <router-link tag="a" to="/">estate</router-link>
            </div>

            <button class="btn-menu"
                @click="showMenu"
            >
                <div class="line" v-for="i of 3" :key="i"></div>
            </button>

            <ul class="list">
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
        showMenu() {
            let list = document.querySelector('.list');
            list.classList.toggle('activeMenu');

            new Promise((resolve, reject) => {
                try {
                    setTimeout(() => {
                        list.classList.toggle('activeMenu');
                        resolve();
                    }, 5000);
                } catch(err) {
                    reject(err);
                }
            });
        }
    },
}
</script>

<style scoped>
    .activeMenu {
        display: block;
        position: absolute;
        
        right: -10px;
        top: 50px;

        background-color: #55d6aa;
        color: #444;

        border-radius: 10px;

        z-index: 100;
    }

    @media screen and (min-width: 380px) {
        .activeMenu {
            display: none;
        }
    }

    .activeMenu > li {
        display: block;
        margin-bottom: 5px;
    }

    .line {
        height: 3px;
        width: 35px;

        background: #55d6aa;

        margin: 4px auto;
    }

    .btn-menu {
        display: none;
        position: absolute;

        right: 15px;
        top: 17px;

        outline: 0;
        border: 0;
        border-radius: 5px;

        width: 45px;
        height: 30px;
        background: #444;
    }

    .navbar {
        background: #444;
        border-radius: 50px 0 50px 0;
        font-family: Georgia, serif;
    }

    @media screen and (max-width: 380px) {
        ul {
            display: none;
        }
        .btn-menu {
            display: block;
        }
    }

    @media screen and (max-width: 220px) {
        .home a {
            transform: rotate(30deg);
            font-size: 10px;
        }
    }

    .home {
        justify-self: start;
        text-align: center;
        padding: 20px 35px 20px 35px;

        border-right: 2px solid #444;
        border-radius: 0 10px 10px 0;

        animation-name: push;
        animation-duration: 3s;
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
        0% {left: 15px; top: 0px;}
        25% {left: 0px; top: 0px;}
        50% {left: 15px; top: 0px;}
        75% {left: 0px; top: 0px;}
        100% {left: 15px; top: 0px;}
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