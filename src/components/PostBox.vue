<script>
export default {
    emits: ["refetch-posts"],
    data() {
        return {
            post: "",
            username: "",
            sending: false
        };
    },
    methods: {
        async onSend() {
            this.sending = true;
            const trimmedPost = this.post.trim();
            const trimmedUsername = this.username.trim();

            try {
                if (trimmedPost.length === 0 || trimmedUsername.length === 0) {
                    throw new Error("Both sections (post and username) must be filled");
                }

                const res = await fetch("https://vue-twitter-a0868-default-rtdb.firebaseio.com/post.json", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        post: this.post,
                        username: this.username
                    })
                });

                if (!res.ok) {
                    throw new Error("Failed to post");
                }

                // Reset fields on success
                this.username = "";
                this.post = "";

                this.$emit("refetch-posts");

            } catch (err) {
                console.error(err.post);
            } finally {
                this.sending = false;
            }
        }
    }
};
</script>

<template>
    <form @submit.prevent="onSend"
        class="flex items-center justify-center space-x-3 p-4 border rounded-lg shadow-sm mx-auto max-w-screen-sm">
        <img src="https://via.placeholder.com/50" alt="Profile Picture" class="w-10 h-10 rounded-full object-cover" />

        <div class="flex flex-col justify-center items-center w-full">
            <input class="p-2 focus:outline-none w-full" type="text" placeholder="Enter Username" v-model="username"
                :disabled="sending" />
            <textarea type="text" placeholder="What is on your mind?"
                class="resize-none flex-grow p-2 text-gray-700 placeholder-gray-400 focus:outline-none w-full"
                v-model="post" :disabled="sending"></textarea>
        </div>

        <button
            class="bg-blue-100 text-black px-4 py-2 rounded-lg focus:outline-none hover:bg-blue-400 hover:text-white"
            type="submit" :disabled="sending">
            Post
        </button>
    </form>
</template>
