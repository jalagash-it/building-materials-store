<template>
    <div
        :class="[
            'widget-filters widget',
            {
                'widget-filters--offcanvas--always': offcanvas === 'always',
                'widget-filters--offcanvas--mobile': offcanvas === 'mobile',
            }
        ]"
    >
        <h4 class="widget-filters__title widget__title">
            {{ title }}
        </h4>

        <div class="widget-filters__list">
            <div v-for="filter in filters" :key="filter.key" class="widget-filters__item">
                <Collapse
                    v-slot:default="{ itemClasses, contentClasses, toggle }"
                    item-open-class="filter--opened"
                    :is-open="true"
                >
                    <div :class="['filter', itemClasses]">
                        <button type="button" class="filter__title" @click="toggle">
                            {{ filter.name }}
                            <ArrowRoundedDown12x7Svg class="filter__arrow" />
                        </button>
                        <div :class="['filter__body', contentClasses]">
                            <div class="filter__container">
                                <FilterWrapper
                                    :filter="filter"
                                    :value="getFilterValue(filter.slug)"
                                    @changeValue="handleValueChange"
                                />
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>

        <div class="widget-filters__actions d-flex mb-n2">
            <button
                type="button"
                class="btn btn-secondary btn-sm"
                @click="resetFilters"
            >
                Reset
            </button>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { SetFilterValuePayload } from '~/store/shop'
import { IFilterValues } from '~/interfaces/list'
import { IFilter } from '~/interfaces/filter'
import { isDefaultFilterValue, serializeFilterValue } from '~/services/filters'
import Collapse from '~/components/shared/collapse.vue'
import FilterWrapper from '~/components/filters/filter-wrapper.vue'
import ArrowRoundedDown12x7Svg from '~/svg/arrow-rounded-down-12x7.svg'

export interface FilterChangeValueEvent {
    filter: IFilter;
    value: IFilter['value'];
}

export type WidgetFiltersOffcanvas = 'always' | 'mobile'

@Component({
    components: { Collapse, ArrowRoundedDown12x7Svg, FilterWrapper }
})
export default class WidgetFilters extends Vue {
    @Prop({ type: String, default: () => '' }) readonly title!: string
    @Prop({ type: String, default: () => 'mobile' }) readonly offcanvas!: WidgetFiltersOffcanvas

    @Getter('shop/productsListFilters') filters!: IFilter[]
    @Getter('shop/filters') values!: IFilterValues

    @Action('shop/resetFilters') resetFilters!: () => void
    @Action('shop/setFilterValue') setFilterValue!: (payload: SetFilterValuePayload) => void

    handleValueChange ({ filter, value }: FilterChangeValueEvent) {
        this.setFilterValue({
            filter: filter.slug,
            value: isDefaultFilterValue(filter, value) ? null : serializeFilterValue(filter, value)
        })
    }

    getFilterValue (filterSlug: string): string {
        return this.values[filterSlug] || ''
    }
}

</script>
