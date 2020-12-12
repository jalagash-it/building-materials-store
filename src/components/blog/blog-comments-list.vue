<template>
    <ol :class="['comments-list', `comments-list--level--${level}`]">
        <li v-for="comment in comments" :key="comment.id" class="comments-list__item">
            <div class="comment">
                <div class="comment__avatar">
                    <AppLink to="/">
                        <!--suppress HtmlUnknownTarget -->
                        <img :src="$url.img(comment.avatar)" alt="">
                    </AppLink>
                </div>
                <div class="comment__content">
                    <div class="comment__header">
                        <div class="comment__author">
                            <AppLink to="/">
                                {{ comment.author }}
                            </AppLink>
                        </div>
                        <div class="comment__reply">
                            <button type="button" class="btn btn-xs btn-light">
                                Reply
                            </button>
                        </div>
                    </div>
                    <div class="comment__text">
                        {{ comment.text }}
                    </div>
                    <div class="comment__date">
                        {{ comment.date }}
                    </div>
                </div>
            </div>
            <div v-if="comment.children && comment.children.length">
                <BlogCommentsList :comments="comment.children" :level="level + 1" />
            </div>
        </li>
    </ol>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IComment } from '~/interfaces/comment'
import AppLink from '~/components/shared/app-link.vue'

@Component({
    name: 'BlogCommentsList',
    components: { AppLink }
})
export default class BlogCommentsList extends Vue {
    @Prop({ type: Array, default: () => [] }) readonly comments!: IComment[]
    @Prop({ type: Number, default: () => 0 }) readonly level!: number
}

</script>
