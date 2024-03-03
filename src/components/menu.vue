<template>
    <main class="menu">
        <ul class="row">
            <li style="margin-left: 40%;">
                <router-link to="/">Home</router-link>
            </li>
            <li> 
                <router-link to="/1">Page1</router-link>
            </li>
            <li>
                <router-link to="/2">Page2</router-link>
            </li>
        </ul>
    </main>
</template>

<script lang="ts" setup>

</script>

<style>
.menu {

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        top: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        background-color: #ddfc7f;
        position: fixed !important;
        width: 100%;
        height: 5%;
    }

    li{
        height: 100%;
    }

    li a {
        color: #666;
        padding: 14px 16px;
        text-decoration: none;
        display: block;
        height: 100%;
    }

    li a:hover:not(.active) {
        background-color: #ddd;
    }
}
</style>