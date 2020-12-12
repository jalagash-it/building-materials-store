<template>
    <BlogPageCategory layout="classic" sidebar-position="start" />
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import BlogPageCategory from '~/components/blog/blog-page-category.vue'

@Component({
    components: { BlogPageCategory }
})
export default class Page extends Vue { }

</script>
