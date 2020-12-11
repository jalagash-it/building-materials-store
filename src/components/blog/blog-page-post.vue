<template>
    <div>
        <PageHeader
            :breadcrumb="[
                { title: 'Home', url: '/' },
                { title: 'Blog', url: '/' },
                { title: 'Latest News', url: '/' },
            ]"
        />

        <div class="container">
            <div v-if="layout === 'classic'" class="row">
                <div v-if="sidebarPosition === 'start'" class="col-12 col-lg-4 order-1 order-lg-0">
                    <BlogSidebar :position="sidebarPosition" />
                </div>
                <div class="col-12 col-lg-8">
                    <BlogPost :layout="layout" />
                </div>
                <div v-if="sidebarPosition === 'end'" class="col-12 col-lg-4">
                    <BlogSidebar :position="sidebarPosition" />
                </div>
            </div>

            <div v-if="layout === 'full'" class="row justify-content-center">
                <div class="col-md-12 col-lg-9 col-xl-8">
                    <BlogPost :layout="layout" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { BlogPagePostLayout, BlogPagePostSidebarPosition } from '~/interfaces/components'
import PageHeader from '~/components/shared/page-header.vue'
import BlogSidebar from '~/components/blog/blog-sidebar.vue'
import BlogPost from '~/components/blog/blog-post.vue'

@Component({
    components: { PageHeader, BlogSidebar, BlogPost },
    head () {
        return {
            title: 'Blog Post Page'
        }
    }
})
export default class BlogPagePost extends Vue {
    @Prop({ type: String, required: true }) readonly layout!: BlogPagePostLayout
    @Prop({ type: String, default: () => 'start' }) readonly sidebarPosition!: BlogPagePostSidebarPosition
}

</script>
