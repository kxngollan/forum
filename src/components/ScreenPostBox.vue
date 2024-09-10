<template>
    <div class="flex justify-center items-center fixed top-0 left-0 w-screen h-screen overflow-hidden z-5">
        <div class="w-full h-full bg-black opacity-50 fixed top-0 left-0" @click="toggleShowing"></div>
        <EditPostBox :post="post" class="z-10 bg-slate-50" @toggle-showing="toggleShowing"
            @refetch-posts="refetchPost" />
    </div>
</template>

<script>
import EditPostBox from './EditPostBox.vue';

export default {
    emits: ["toggle-showing", "refetch-posts"],
    components: {
        EditPostBox
    },
    props: { post: Object },
    methods: {
        toggleShowing() {
            this.$emit("toggle-showing")
        },
        refetchPost() {
            this.$emit("refetch-posts")
        }
    }
}
</script>