<template>
    <div>
        <PageHeader
            title="Latest News"
            :breadcrumb="[
                { title: 'Home', url: '/' },
                { title: 'Blog', url: '/' },
                { title: 'Latest News', url: '/' },
            ]"
        />

        <div class="container">
            <div class="row">
                <div v-if="sidebarPosition === 'start'" class="col-12 col-lg-4 order-1 order-lg-0">
                    <BlogSidebar :position="sidebarPosition" />
                </div>
                <div class="col-12 col-lg-8">
                    <div class="block">
                        <div class="posts-view">
                            <div :class="['posts-view__list', 'posts-list', `posts-list--layout--${layout}`]">
                                <div class="posts-list__body">
                                    <div v-for="post in posts" :key="post.id" class="posts-list__item">
                                        <PostCard :post="post" :layout="cardLayout" />
                                    </div>
                                </div>
                            </div>
                            <div class="posts-view__pagination">
                                <Pagination
                                    :current="page"
                                    :siblings="2"
                                    :total="10"
                                    @page-change="setPage"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="sidebarPosition === 'end'" class="col-12 col-lg-4">
                    <BlogSidebar :position="sidebarPosition" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IPost } from '~/interfaces/post'
import { PostCardLayout } from '~/interfaces/components'
import Pagination from '~/components/shared/pagination.vue'
import PageHeader from '~/components/shared/page-header.vue'
import PostCard from '~/components/shared/post-card.vue'
import BlogSidebar from '~/components/blog/blog-sidebar.vue'
import dataBlogPosts from '~/data/blogPosts'

type Layout = 'classic' | 'grid' | 'list';
type SidebarPosition = 'start' | 'end';
type PostCardLayoutMap = {[K in Layout]: PostCardLayout}

const postCartLayoutMap: PostCardLayoutMap = {
    classic: 'grid-lg',
    grid: 'grid-nl',
    list: 'list-nl'
}

@Component({
    components: { Pagination, PageHeader, BlogSidebar, PostCard },
    head () {
        return {
            title: 'Blog Category Page'
        }
    }
})
export default class BlogPageCategory extends Vue {
    @Prop({ type: String, required: true }) readonly layout!: Layout
    @Prop({ type: String, required: true }) readonly sidebarPosition!: SidebarPosition

    page: number = 1
    posts: IPost[] = dataBlogPosts

    get cardLayout (): PostCardLayout {
        return postCartLayoutMap[this.layout]
    }

    setPage (page: number): void {
        this.page = page
    }
}

</script>
