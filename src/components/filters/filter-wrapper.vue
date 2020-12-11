<template>
    <div>
        <FilterCategory
            v-if="filter.type === 'category'"
            :filter="filter"
        />
        <FilterRange
            v-if="filter.type === 'range'"
            :filter="filter"
            :value="getFilterValue(filter, value)"
            @changeValue="$emit('changeValue', $event)"
        />
        <FilterCheck
            v-if="filter.type === 'check'"
            :filter="filter"
            :value="getFilterValue(filter, value)"
            @changeValue="$emit('changeValue', $event)"
        />
        <FilterRadio
            v-if="filter.type === 'radio'"
            :filter="filter"
            :value="getFilterValue(filter, value)"
            @changeValue="$emit('changeValue', $event)"
        />
        <FilterColor
            v-if="filter.type === 'color'"
            :filter="filter"
            :value="getFilterValue(filter, value)"
            @changeValue="$emit('changeValue', $event)"
        />
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IFilter } from '~/interfaces/filter'
import { getFilterValue } from '~/services/filters'
import FilterCategory from '~/components/filters/filter-category.vue'
import FilterRange from '~/components/filters/filter-range.vue'
import FilterCheck from '~/components/filters/filter-check.vue'
import FilterRadio from '~/components/filters/filter-radio.vue'
import FilterColor from '~/components/filters/filter-color.vue'

@Component({
    components: { FilterCategory, FilterRange, FilterCheck, FilterRadio, FilterColor }
})
export default class FilterWrapper extends Vue {
    @Prop({ type: Object, required: true }) readonly filter!: IFilter
    @Prop({ type: String, required: true }) readonly value!: string

    getFilterValue = getFilterValue
}

</script>
