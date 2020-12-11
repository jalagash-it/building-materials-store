<template>
    <div :class="['widget-categories', `widget-categories--location--${location} widget`]">
        <h4 class="widget__title">
            Categories
        </h4>
        <ul class="widget-categories__list">
            <Collapse
                v-for="category in categories"
                :key="category.id"
                v-slot:default="{ itemClasses, contentClasses, toggle }"
                item-open-class="widget-categories__item--open"
            >
                <li :class="['widget-categories__item', itemClasses]">
                    <div class="widget-categories__row">
                        <AppLink :to="$url.category(category)">
                            <ArrowRoundedRight6x9Svg class="widget-categories__arrow" />
                            {{ category.name }}
                        </AppLink>
                        <button
                            v-if="category.children && category.children.length > 0"
                            class="widget-categories__expander"
                            type="button"
                            aria-label="Expand"
                            @click="toggle"
                        />
                    </div>
                    <div
                        v-if="category.children && category.children.length > 0"
                        :class="['widget-categories__subs', contentClasses]"
                    >
                        <ul>
                            <li v-for="child in category.children" :key="child.id">
                                <AppLink :to="$url.category(child)">
                                    {{ child.name }}
                                </AppLink>
                            </li>
                        </ul>
                    </div>
                </li>
            </Collapse>
        </ul>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { ICategory } from '~/interfaces/category'
import AppLink from '~/components/shared/app-link.vue'
import Collapse from '~/components/shared/collapse.vue'
import ArrowRoundedRight6x9Svg from '~/svg/arrow-rounded-right-6x9.svg'

export type WidgetCategoriesLocation = 'blog' | 'shop';

@Component({
    components: { AppLink, ArrowRoundedRight6x9Svg, Collapse }
})
export default class WidgetCategories extends Vue {
    @Prop({ type: Array, default: () => [] }) readonly categories!: ICategory[]
    @Prop({ type: String, required: true }) readonly location!: WidgetCategoriesLocation
}

</script>
