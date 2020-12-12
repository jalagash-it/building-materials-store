<template>
    <ul class="pagination justify-content-center">
        <li :class="['page-item', {'disabled': current <= 1}]">
            <button
                type="button"
                class="page-link page-link--with-arrow"
                aria-label="Previous"
                @click="setPage(current - 1)"
            >
                <ArrowRoundedLeft8x13Svg class="page-link__arrow page-link__arrow--left" aria-hidden="true" />
            </button>
        </li>

        <li v-for="page in pages" :key="page" :class="['page-item', {active: page === current}]">
            <button type="button" class="page-link" @click="setPage(page)">
                {{ page }}
                <span v-if="page === current" class="sr-only">(current)</span>
            </button>
        </li>
        <li :class="['page-item', {'disabled': current >= total}]">
            <button
                type="button"
                class="page-link page-link--with-arrow"
                aria-label="Next"
                @click="setPage(current + 1)"
            >
                <ArrowRoundedRight8x13Svg class="page-link__arrow page-link__arrow--right" aria-hidden="true" />
            </button>
        </li>
    </ul>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import ArrowRoundedLeft8x13Svg from '~/svg/arrow-rounded-left-8x13.svg'
import ArrowRoundedRight8x13Svg from '~/svg/arrow-rounded-right-8x13.svg'

@Component({
    components: { ArrowRoundedLeft8x13Svg, ArrowRoundedRight8x13Svg }
})
export default class Pagination extends Vue {
    @Prop({ type: Number, default: () => 1 }) readonly siblings!: number
    @Prop({ type: Number, default: () => 1 }) readonly current!: number
    @Prop({ type: Number, default: () => 1 }) readonly total!: number

    get pages () {
        const pages = []
        const min = Math.max(
            1,
            this.current - this.siblings - Math.max(
                0,
                this.siblings - this.total + this.current
            )
        )
        const max = Math.min(this.total, min + this.siblings * 2)

        for (let i = min; i <= max; i += 1) {
            pages.push(i)
        }

        return pages
    }

    @Emit('page-change')
    setPage (value: number) {
        if (value < 1 || value > this.total || value === this.current) {
            return
        }

        return value
    }
}

</script>
