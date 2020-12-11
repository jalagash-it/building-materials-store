<template>
    <div :class="cardClasses">
        <div class="post-card__image">
            <AppLink :to="$url.blogPost()">
                <!--suppress HtmlUnknownTarget -->
                <img :src="$url.img(post.image)" alt="">
            </AppLink>
        </div>
        <div class="post-card__info">
            <div class="post-card__category">
                <AppLink v-for="(category, index) in post.categories" :key="index" :to="$url.blogCategory()">
                    {{ category }}
                </AppLink>
            </div>
            <div class="post-card__name">
                <AppLink :to="$url.blogPost()">
                    {{ post.title }}
                </AppLink>
            </div>
            <div class="post-card__date">
                {{ post.date }}
            </div>
            <div class="post-card__content">
                In one general sense, philosophy is associated with wisdom,
                intellectual culture and a search for knowledge.
                In that sense, all cultures...
            </div>
            <div class="post-card__read-more">
                <AppLink to="/" class="btn btn-secondary btn-sm">
                    Read More
                </AppLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { IPost } from '~/interfaces/post'
import { PostCardLayout } from '~/interfaces/components'
import AppLink from '~/components/shared/app-link.vue'

@Component({
    components: { AppLink }
})
export default class PostCard extends Vue {
    @Prop({ type: String, default: () => undefined }) readonly layout!: PostCardLayout
    @Prop({ type: Object, required: true }) readonly post!: IPost

    get cardClasses () {
        return [
            'post-card',
            {
                'post-card--layout--grid': this.layout && ['grid-nl', 'grid-lg'].includes(this.layout),
                'post-card--layout--list': this.layout && ['list-nl', 'list-sm'].includes(this.layout),
                'post-card--size--nl': this.layout && ['grid-nl', 'list-nl'].includes(this.layout),
                'post-card--size--lg': this.layout === 'grid-lg',
                'post-card--size--sm': this.layout === 'list-sm'
            }
        ]
    }
}

</script>
