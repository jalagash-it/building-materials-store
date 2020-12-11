<template>
    <div class="filter-list">
        <div class="filter-list__list">
            <label
                v-for="item in filter.items"
                :key="item.slug"
                :class="[
                    'filter-list__item',
                    {'filter-list__item--disabled': item.count === 0}
                ]"
            >
                <span class="filter-list__input input-radio">
                    <span class="input-radio__body">
                        <input
                            class="input-radio__input"
                            type="radio"
                            :name="filter.slug"
                            :value="item.slug"
                            :checked="value === item.slug"
                            :disabled="item.count === 0"
                            @change="handleChange"
                        >
                        <span class="input-radio__circle" />
                    </span>
                </span>
                <span class="filter-list__title">{{ item.name }}</span>
                <span v-if="item.count" class="filter-list__counter">{{ item.count }}</span>
            </label>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IRadioFilter, IRadioFilterValue } from '~/interfaces/filter'

@Component
export default class FilterRadio extends Vue {
    @Prop({ type: Object, required: true }) readonly filter!: IRadioFilter
    @Prop({ type: String, required: true }) readonly value!: IRadioFilterValue

    handleChange (event: InputEvent) {
        if (event.target instanceof HTMLInputElement) {
            const value = event.target.value

            if (event.target.checked && value !== this.value) {
                this.$emit('changeValue', {
                    filter: this.filter,
                    value
                })
            }
        }
    }
}

</script>
