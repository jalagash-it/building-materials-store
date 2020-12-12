<template>
    <div class="filter-categories">
        <ul class="filter-categories__list">
            <li
                v-if="filter.value"
                :key="'[shop]'"
                class="filter-categories__item filter-categories__item--parent"
            >
                <ArrowRoundedLeft6x9Svg class="filter-categories__arrow" />
                <AppLink :to="$url.catalog()">
                    All Products
                </AppLink>
            </li>

            <template v-for="category in filter.items">
                <li
                    v-for="parent in getCategoryParents(category)"
                    :key="parent.id"
                    class="filter-categories__item filter-categories__item--parent"
                >
                    <ArrowRoundedLeft6x9Svg class="filter-categories__arrow" />
                    <AppLink :to="$url.category(parent)">
                        {{ parent.name }}
                    </AppLink>
                </li>
                <li
                    :key="category.id"
                    :class="[
                        'filter-categories__item',
                        {'filter-categories__item--current': filter.value === category.slug}
                    ]"
                >
                    <AppLink :to="$url.category(category)">
                        {{ category.name }}
                    </AppLink>
                </li>
                <li
                    v-for="child in category.children"
                    :key="child.id"
                    class="filter-categories__item filter-categories__item--child"
                >
                    <AppLink :to="$url.category(child)">
                        {{ child.name }}
                    </AppLink>
                </li>
            </template>
        </ul>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { ICategoryFilter } from '~/interfaces/filter'
import { getCategoryParents } from '~/services/helpers'
import AppLink from '~/components/shared/app-link.vue'
import ArrowRoundedLeft6x9Svg from '~/svg/arrow-rounded-left-6x9.svg'

@Component({
    components: { AppLink, ArrowRoundedLeft6x9Svg }
})
export default class FilterCategory extends Vue {
    @Prop({ type: Object, required: true }) readonly filter!: ICategoryFilter

    getCategoryParents = getCategoryParents
}

</script>
