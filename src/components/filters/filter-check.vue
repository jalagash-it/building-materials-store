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
                <span class="filter-list__input input-check">
                    <span class="input-check__body">
                        <input
                            class="input-check__input"
                            type="checkbox"
                            :value="item.slug"
                            :checked="value.includes(item.slug)"
                            :disabled="item.count === 0"
                            @change="handleChange"
                        >
                        <span class="input-check__box" />
                        <Check9x7Svg class="input-check__icon" />
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
import { ICheckFilter, ICheckFilterValue } from '~/interfaces/filter'
import Check9x7Svg from '~/svg/check-9x7.svg'

@Component({
    components: { Check9x7Svg }
})
export default class FilterCheck extends Vue {
    @Prop({ type: Object, required: true }) readonly filter!: ICheckFilter
    @Prop({ type: Array, required: true }) readonly value!: ICheckFilterValue

    handleChange (event: InputEvent) {
        if (event.target instanceof HTMLInputElement) {
            const value = event.target.value

            if (event.target.checked && !this.value.includes(value)) {
                this.$emit('changeValue', {
                    filter: this.filter,
                    value: [...this.value, value]
                })
            }
            if (!event.target.checked && this.value.includes(value)) {
                this.$emit('changeValue', {
                    filter: this.filter,
                    value: this.value.filter(x => x !== value)
                })
            }
        }
    }
}

</script>
