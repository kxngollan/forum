<script>
export default {
    emits: ["refetch-posts", "toggle-showing"],
    props: { post: Object },
    data() {
        return {
            edittedPost: this.post.post,
            username: this.post.username,
            sending: false
        };
    },
    methods: {
        async onEdit(postId) {
            this.sending = true;
            try {
                const res = await fetch(`https://vue-twitter-a0868-default-rtdb.firebaseio.com/post/${postId}.json`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        post: this.edittedPost,
                        username: this.username,
                    })
                });

                const data = await res.json()
                console.log(postId)
                console.log(data);

                if (!res.ok) {
                    throw new Error("Failed to update post");
                }

                this.$emit("refetch-posts")
                this.sending = false
            } catch (err) {
                console.error(err);
            }
        },

        onCancel() {
            this.$emit("toggle-showing")
        }

    }
};
</script>

<template>
    <form @submit.prevent="onEdit(post.id)"
        class="flex items-center justify-center space-x-3 p-4 border rounded-lg shadow-sm mx-auto bg-slate-50 ">
        <img src="https://via.placeholder.com/50" alt="Profile Picture" class="w-10 h-10 rounded-full object-cover" />
        <div class="flex flex-col justify-center items-center w-3/5">
            <input class="p-2 focus:outline-none border border-gray-300 rounded w-full" type="text"
                placeholder="Enter Username" v-model="username" :disabled="sending" />
            <textarea type="text" placeholder="What is on your mind?"
                class="resize-none flex-grow p-2 text-gray-700 placeholder-gray-400 focus:outline-none border border-gray-300 rounded mt-2 w-full"
                v-model="edittedPost" :disabled="sending"></textarea>
        </div>
        <div class="flex flex-col gap-3">
            <button
                class="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-600 hover:text-white disabled:bg-gray-300"
                @click="onCancel" :disabled="sending">
                Cancel
            </button>
            <button
                class="bg-blue-100 text-black px-4 py-2 rounded-lg hover:bg-blue-400 hover:text-white disabled:bg-blue-100"
                type="submit" :disabled="sending">
                Edit
            </button>
        </div>
    </form>
</template>
