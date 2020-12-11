<template>
    <div class="widget-posts widget">
        <h4 class="widget__title">
            Latest Posts
        </h4>
        <div class="widget-posts__list">
            <div v-for="post in posts" :key="post.id" class="widget-posts__item">
                <div class="widget-posts__image">
                    <AppLink :to="$url.blogPost()">
                        <!--suppress HtmlUnknownTarget -->
                        <img :src="$url.img(postImage(post))" alt="">
                    </AppLink>
                </div>
                <div class="widget-posts__info">
                    <div class="widget-posts__name">
                        <AppLink :to="$url.blogPost()">
                            {{ post.title }}
                        </AppLink>
                    </div>
                    <div class="widget-posts__date">
                        {{ post.date }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IPost } from '~/interfaces/post'
import AppLink from '~/components/shared/app-link.vue'

@Component({
    components: { AppLink }
})
export default class WidgetPosts extends Vue {
    @Prop({ type: Array, default: () => [] }) readonly posts!: IPost[]

    postImage (post: IPost) {
        return post.image.replace(/\.jpg$/, '-thumbnail.jpg')
    }
}

</script>
