<template>
    <div
        :class="[
            'totop',
            {'totop--show': show}
        ]"
    >
        <div class="totop__body">
            <div class="totop__start" />
            <div class="totop__container container" />
            <div class="totop__end">
                <button type="button" class="totop__button" @click="onClick">
                    <ArrowRoundedUp13x8Svg />
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import ArrowRoundedUp13x8Svg from '~/svg/arrow-rounded-up-13x8.svg'

@Component({
    components: { ArrowRoundedUp13x8Svg }
})
export default class ToTop extends Vue {
    show: boolean = false
    showFrom: number = 300

    mounted () {
        document.addEventListener('scroll', this.onScroll, { passive: true })
    }

    beforeDestroy () {
        document.removeEventListener('scroll', this.onScroll)
    }

    onScroll (): void {
        this.show = window.pageYOffset >= this.showFrom
    }

    onClick (): void {
        try {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        } catch {
            window.scrollTo(0, 0)
        }
    }
}

</script>
