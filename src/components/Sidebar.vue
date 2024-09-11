<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import ScreenPostBox from "./ScreenPostBox.vue"

const route = useRoute()
const current = ref(route.path)
const showing = ref(false)
const nav = ref([
    {path:"/home", label:"Home"},{
        path:"/explore",label:"Explore"
    }
])

const setShowing = () => {
    console.log(showing)
    return showing.value = !showing.value
}

watch(() => route.path, (newPath) => current.value = newPath)
</script>

<template>
    <div class="h-screen w-64 border-r-2 flex flex-col p-4">
        <ul class="space-y-4 flex-grow">
            <router-link v-for="(link, i) in links" :to="'/home'">
                <li :class="{
                    '!bg-blue-400': current === '/home',
                    '!pl-2': current === '/home',
                    '!text-white': current === '/home',
                    'flex': true,
                    'items-center': true,
                    'space-x-4': true,
                    'pr-1': true,
                    'hover:text-black': true,
                    'hover:bg-blue-200': true,
                    'rounded': true,
                    'cursor-pointer': true
                }">
                    <span>Home</span>
                </li>
            </router-link>
            <router-link :to="'/explore'">
                <li :class="{
                    '!bg-blue-400': current === '/explore',
                    '!pl-2': current === '/explore',
                    '!text-white': current === '/explore',
                    'flex': true,
                    'items-center': true,
                    'space-x-4': true,
                    'pr-1': true,
                    'hover:text-black': true,
                    'hover:bg-blue-200': true,
                    'rounded': true,
                    'cursor-pointer': true
                }">
                    <span>Explore</span>
                </li>
            </router-link>
            <router-link :to="'/notifications'">
                <li :class="{
                    '!bg-blue-400': current === '/notifications',
                    '!pl-2': current === '/notifications',
                    '!text-white': current === '/notifications',
                    'flex': true,
                    'items-center': true,
                    'space-x-4': true,
                    'pr-1': true,
                    'hover:text-black': true,
                    'hover:bg-blue-200': true,
                    'rounded': true,
                    'cursor-pointer': true
                }">
                    <span>Notifications</span>
                </li>
            </router-link>
            <router-link :to="'/messages'">
                <li :class="{
                    '!bg-blue-400': current === '/messages',
                    '!pl-2': current === '/messages',
                    '!text-white': current === '/messages',
                    'flex': true,
                    'items-center': true,
                    'space-x-4': true,
                    'pr-1': true,
                    'hover:text-black': true,
                    'hover:bg-blue-200': true,
                    'rounded': true,
                    'cursor-pointer': true
                }">
                    <span>Messages</span>
                </li>
            </router-link>
            <router-link :to="'/bookmarks'">
                <li :class="{
                    '!bg-blue-400': current === '/bookmarks',
                    '!pl-2': current === '/bookmarks',
                    '!text-white': current === '/bookmarks',
                    'flex': true,
                    'items-center': true,
                    'space-x-4': true,
                    'pr-1': true,
                    'hover:text-black': true,
                    'hover:bg-blue-200': true,
                    'rounded': true,
                    'cursor-pointer': true
                }">
                    <span>Bookmarks</span>
                </li>
            </router-link>
            <router-link :to="'/profile'">
                <li :class="{
                    '!bg-blue-400': current === '/profile',
                    '!pl-2': current === '/profile',
                    '!text-white': current === '/profile',
                    'flex': true,
                    'items-center': true,
                    'space-x-4': true,
                    'pr-1': true,
                    'hover:text-black': true,
                    'hover:bg-blue-200': true,
                    'rounded': true,
                    'cursor-pointer': true
                }">
                    <span>Profile</span>
                </li>
            </router-link>
            <router-link :to="'/more'">
                <li :class="{
                    '!bg-blue-400': current === '/more',
                    '!pl-2': current === '/more',
                    '!text-white': current === '/more',
                    'flex': true,
                    'items-center': true,
                    'space-x-4': true,
                    'pr-1': true,
                    'hover:text-black': true,
                    'hover:bg-blue-200': true,
                    'rounded': true,
                    'cursor-pointer': true
                }">
                    <span>More</span>
                </li>
            </router-link>
            <button class="bg-blue-300 hover:bg-blue-600 text-white py-2 rounded-lg w-full" @click="setShowing">
                Post
            </button>
        </ul>

        <!-- Will update late for better UI -->
        <div class="flex">
            <img src="" alt="profile picture ">
            <div>
                <h2>Display Name</h2>
                <h3>USERNAME</h3>
            </div>
        </div>
    </div>
    <ScreenPostBox v-if="showing" @toggle-showing="setShowing" />
</template>
