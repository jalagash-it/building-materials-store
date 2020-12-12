<template>
    <BlogPagePost layout="classic" sidebar-position="end" />
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import BlogPagePost from '~/components/blog/blog-page-post.vue'

@Component({
    components: { BlogPagePost }
})
export default class Page extends Vue { }

</script>
