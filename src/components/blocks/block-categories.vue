<template>
    <div :class="`block block--highlighted block-categories block-categories--layout--${layout}`">
        <div class="container">
            <BlockHeader :title="title" />

            <div class="block-categories__list">
                <div
                    v-for="(category, index) in categories"
                    :key="index"
                    :class="`block-categories__item category-card category-card--layout--${layout}`"
                >
                    <div class=" category-card__body">
                        <div class=" category-card__image">
                            <AppLink :to="$url.category(category)">
                                <!--suppress HtmlUnknownTarget -->
                                <img :src="$url.img(category.image)" alt="">
                            </AppLink>
                        </div>
                        <div class=" category-card__content">
                            <div class=" category-card__name">
                                <AppLink :to="$url.category(category)">
                                    {{ category.name }}
                                </AppLink>
                            </div>
                            <ul class="category-card__links">
                                <li v-for="(sub, subIndex) in category.children" :key="subIndex">
                                    <AppLink :to="$url.category(sub)">
                                        {{ sub.name }}
                                    </AppLink>
                                </li>
                            </ul>
                            <div class="category-card__all">
                                <AppLink :to="$url.category(category)">
                                    Show All
                                </AppLink>
                            </div>
                            <div class="category-card__products">
                                {{ category.items }} Products
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import BlockHeader from '~/components/shared/block-header.vue'
import AppLink from '~/components/shared/app-link.vue'
import { ICategory } from '~/interfaces/category'

type BlockCategoriesLayout = 'classic' | 'compact';

@Component({
    components: { BlockHeader, AppLink }
})
export default class BlockCategories extends Vue {
    @Prop({ type: String, required: true }) title!: string
    @Prop({ type: String, default: () => 'classic' }) layout!: BlockCategoriesLayout
    @Prop({ type: Array, default: () => [] }) categories!: ICategory[]
}

</script>
