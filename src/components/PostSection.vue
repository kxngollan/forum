<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import ScreenPostBox from './ScreenPostBox.vue';


export default {
    emits: ["refetch-posts"],
    components: { FontAwesomeIcon, ScreenPostBox },
    data() {
        return {
            faTrash,
            faPen,
            editting: {},
            showing: false
        }
    },
    props: {
        posts: Array,
        loading: Boolean,
        err: String
    },
    methods: {
        toggleShowing() {
            this.showing = !this.showing
        },
        refetchPosts() {
            this.toggleShowing()
            this.$emit("refetch-posts")
        },
        editPost(post) {
            console.log(post)
            this.toggleShowing()
            this.editting = post
        },
        async deletePost(postId) {
            try {
                const res = await fetch(`https://vue-twitter-a0868-default-rtdb.firebaseio.com/post/${postId}.json`, {
                    method: "DELETE", headers: { "Content-Type": "application/json" },
                })

                if (!res.ok) {
                    throw new Error({ post: "Failed to delete" })
                }
                this.$emit("refetch-posts")
            } catch (err) {
                console.error("Failed to delete")
            }
        },
    }
}
</script>

<template>

    <div class="flex flex-col space-x-3 p-4 border rounded-lg shadow-sm mx-auto max-w-screen-sm h-full">
        <div v-if="err">
            <p>{{ err }}</p>
        </div>
        <div v-if="loading" class="flex w-full h-full justify-center items-center">
            <div class="loader"></div>
        </div>
        <div v-else-if="!loading && (!posts || posts.length === 0) && !err" class="flex justify-center">
            <h3 class="text-bold">
                No Posts. Be the first
            </h3>
        </div>
        <div v-else-if="!loading && posts.length > 0">
            <div v-for="(post, i) in posts" :key="i" class="flex justify-between items-center mb-3 rounded-md">
                <img src="https://via.placeholder.com/50" alt="Profile Picture" class="w-10 h-10 rounded-full mr-4">
                <div class="w-full">
                    <h2 class="font-bold">{{ post.username }}</h2>
                    <p class="h-full">{{ post.post }}</p>
                </div>
                <div class="flex flex-col items-center space-y-1">
                    <button
                        class="bg-gray-300 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-600 hover:text-white"
                        @click="editPost(post)">
                        <FontAwesomeIcon :icon="faPen" />
                    </button>
                    <button
                        class="bg-red-300 rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 hover:text-white"
                        @click="deletePost(post.id)">
                        <FontAwesomeIcon :icon="faTrash" />
                    </button>
                    <ScreenPostBox v-if="showing" :post="editting"
                        class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10"
                        @toggle-showing="toggleShowing" @refetch-posts="refetchPosts" />
                </div>
            </div>
        </div>
    </div>
</template>
