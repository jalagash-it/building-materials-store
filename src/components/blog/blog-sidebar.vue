<template>
    <div :class="['block', 'block-sidebar', `block-sidebar--position--${position}`]">
        <div class="block-sidebar__item">
            <WidgetSearch />
        </div>
        <div class="block-sidebar__item">
            <WidgetAboutUs />
        </div>
        <div class="block-sidebar__item">
            <WidgetCategories :categories="categories" location="blog" />
        </div>
        <div class="block-sidebar__item">
            <WidgetPosts :posts="posts" />
        </div>
        <div class="block-sidebar__item">
            <WidgetNewsletter />
        </div>
        <div class="block-sidebar__item">
            <WidgetComments :comments="comments" />
        </div>
        <div class="block-sidebar__item">
            <WidgetTags />
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { ICategory } from '~/interfaces/category'
import { IPost } from '~/interfaces/post'
import { IComment } from '~/interfaces/comment'
import { BlogPagePostSidebarPosition } from '~/interfaces/components'
import WidgetSearch from '~/components/widgets/widget-search.vue'
import WidgetAboutUs from '~/components/widgets/widget-about-us.vue'
import WidgetCategories from '~/components/widgets/widget-categories.vue'
import WidgetPosts from '~/components/widgets/widget-posts.vue'
import WidgetNewsletter from '~/components/widgets/widget-newsletter.vue'
import WidgetComments from '~/components/widgets/widget-comments.vue'
import WidgetTags from '~/components/widgets/widget-tags.vue'
import dataBlogPosts from '~/data/blogPosts'
import dataBlogWidgetLatestComments from '~/data/blogWidgetLatestComments'
import dataBlogWidgetCategories from '~/data/blogWidgetCategories'

@Component({
    components: {
        WidgetSearch,
        WidgetAboutUs,
        WidgetPosts,
        WidgetNewsletter,
        WidgetComments,
        WidgetTags,
        WidgetCategories
    }
})
export default class BlogSidebar extends Vue {
    @Prop({ type: String, default: () => 'start' }) readonly position!: BlogPagePostSidebarPosition

    categories: ICategory[] = dataBlogWidgetCategories

    posts: IPost[] = dataBlogPosts.slice(0, 3)

    comments: IComment[] = dataBlogWidgetLatestComments.slice(0, 3)
}

</script>
