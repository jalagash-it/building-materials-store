<template>
    <div class="filter-color">
        <div class="filter-color__list">
            <div
                v-for="item in filter.items"
                :key="item.slug"
                class="filter-color__item"
            >
                <span
                    :class="[
                        'filter-color__check input-check-color',
                        {
                            'input-check-color--white': colorType(item.color) === 'white',
                            'input-check-color--light': colorType(item.color) === 'light',
                        }
                    ]"
                    :style="{ color: item.color }"
                >
                    <label class="input-check-color__body">
                        <input
                            class="input-check-color__input"
                            type="checkbox"
                            :value="item.slug"
                            :checked="value.includes(item.slug)"
                            :disabled="item.count === 0"
                            @change="handleChange"
                        >
                        <span class="input-check-color__box" />
                        <Check12x9Svg class="input-check-color__icon" />
                        <span class="input-check-color__stick" />
                    </label>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IColorFilter, IColorFilterValue } from '~/interfaces/filter'
import { colorType } from '~/services/color'
import Check12x9Svg from '~/svg/check-12x9.svg'

@Component({
    components: { Check12x9Svg }
})
export default class FilterColor extends Vue {
    @Prop({ type: Object, required: true }) readonly filter!: IColorFilter
    @Prop({ type: Array, required: true }) readonly value!: IColorFilterValue

    colorType = colorType

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
