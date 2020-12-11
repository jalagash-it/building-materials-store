<template>
    <div class="widget-comments widget">
        <h4 class="widget__title">
            Latest Comments
        </h4>
        <ul class="widget-comments__list">
            <li v-for="comment in comments" :key="comment.id" class="widget-comments__item">
                <div class="widget-comments__author">
                    <AppLink to="/">
                        {{ comment.author }}
                    </AppLink>
                </div>
                <div class="widget-comments__content">
                    {{ comment.text }}
                </div>
                <div class="widget-comments__meta">
                    <div class="widget-comments__date">
                        {{ comment.date }}
                    </div>
                    <div class="widget-comments__name">
                        On
                        <AppLink to="/" :title="comment.postTitle">
                            {{ comment.postTitle }}
                        </AppLink>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IComment } from '~/interfaces/comment'
import AppLink from '~/components/shared/app-link.vue'

@Component({
    components: { AppLink }
})
export default class WidgetComments extends Vue {
    @Prop({ type: Array, default: () => [] }) readonly comments!: IComment[]
}

</script>
