            
<script>
import PostBox from '../components/PostBox.vue';
import PostSection from '../components/PostSection.vue';
// import Sidebar from '../components/Sidebar.vue';

export default {
    components: {
        PostBox, PostSection,
        // Sidebar
    }, data() {
        return {
            posts: [],
            loading: true,
            err: ""
        }
    },
    methods: {
        async fetchPosts() {
            try {
                const res = await fetch("https://vue-twitter-a0868-default-rtdb.firebaseio.com/post.json")
                if (!res.ok) {
                    throw new Error({ message: "Failed to fetch" })
                }
                const data = await res.json()
                const results = []
                for (const id in data) {
                    results.push({
                        id: id,
                        post: data[id].post,
                        username: data[id].username
                    })
                }
                this.posts = results.reverse()
            } catch (error) {
                console.error(error)
                this.err = "Failed to fetch"
            } finally {
                this.loading = false
            }
        }
    },
    mounted() {
        this.fetchPosts()
    }
}
</script>
            
<template>
    <main class="flex justify-start gap-1">
        <!-- <Sidebar /> -->
        <section>
            <PostBox @refetch-posts="fetchPosts" />
            <PostSection class="mt-2 h-screen" @refetch-posts="fetchPosts" :posts="posts" :loading="loading"
                :err="err" />
        </section>
    </main>
</template>