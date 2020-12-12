<template>
    <div class="filter-price">
        <div class="filter-price__slider">
            <VueSlider
                v-model="internalValue"
                :min="filter.min"
                :max="filter.max"
                :height="6"
                :dot-size="16"
                tooltip="none"
                @change="handleChange"
            />
        </div>
        <div class="filter-price__title">
            Price:
            <span class="filter-price__min-value">{{ $price(internalValue[0]) }}</span>
            –
            <span class="filter-price__max-value">{{ $price(internalValue[1]) }}</span>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import { IRangeFilter, IRangeFilterValue } from '~/interfaces/filter'

interface Data {
    internalValue: IRangeFilterValue;
    timer: any;
    timerActive: boolean;
}

@Component({
    components: { VueSlider }
})
export default class FilterRange extends Vue {
    @Prop({ type: Object, required: true }) readonly filter!: IRangeFilter
    @Prop({ type: Array, required: true }) readonly value!: IRangeFilterValue

    internalValue: IRangeFilterValue = this.value
    timer: any = null
    timerActive: boolean = false

    @Watch('value')
    onValueChange (value: IRangeFilterValue) {
        if (!this.timerActive) {
            this.internalValue = value
        }
    }

    handleChange (value: IRangeFilterValue) {
        clearTimeout(this.timer)

        this.timerActive = true
        this.timer = setTimeout(() => {
            this.timerActive = false

            this.$emit('changeValue', {
                filter: this.filter,
                value
            })
        }, 500)
    }
}

</script>
