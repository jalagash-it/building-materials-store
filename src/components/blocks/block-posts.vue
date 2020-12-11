<template>
    <div
        class="block block-posts"
        :data-layout="layout"
        :data-mobile-columns="mobileGridColumns"
    >
        <div class="container">
            <BlockHeader
                arrows
                :title="title"
                @next="handleNextClick"
                @prev="handlePrevClick"
            />

            <div class="block-posts__slider">
                <Carousel ref="carousel" :options="carouselOptions">
                    <CarouselSlide v-for="post in posts" :key="post.id">
                        <PostCard :post="post" />
                    </CarouselSlide>
                </Carousel>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { Swiper } from 'swiper'
import { SwiperOptions } from 'swiper/types/swiper-options'
import { IPost } from '~/interfaces/post'
import BlockHeader from '~/components/shared/block-header.vue'
import Carousel from '~/components/shared/carousel.vue'
import CarouselSlide from '~/components/shared/carousel-slide.vue'
import PostCard from '~/components/shared/post-card.vue'

type BlockPostsLayout = 'list' | 'grid-3' | 'grid-4';
type BlockPostsMobileGridColumns = 1 | 2;

interface Data {
    carouselOptions: SwiperOptions
}

const carouselOptionsBase: SwiperOptions = {
    spaceBetween: 30,
    pagination: {},
    roundLengths: true
}
const carouselOptionsByLayout: { [layout: string]: SwiperOptions } = {
    list: {
        breakpoints: {
            992: { slidesPerView: 2 },
            0: { slidesPerView: 1 }
        }
    },
    'grid-3': {
        breakpoints: {
            992: { slidesPerView: 3 },
            768: { slidesPerView: 2 }
        }
    },
    'grid-4': {
        breakpoints: {
            1200: { slidesPerView: 4, spaceBetween: 20 },
            992: { slidesPerView: 3, spaceBetween: 24 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            460: { slidesPerView: 2, spaceBetween: 20 }
        }
    }
}
const carouselBreakpointsByMobileGridColumns: { [columns: number]: SwiperOptions['breakpoints'] } = {
    1: {
        0: { slidesPerView: 1 }
    },
    2: {
        460: { slidesPerView: 2, spaceBetween: 20 },
        400: { slidesPerView: 2, spaceBetween: 16 },
        320: { slidesPerView: 2, spaceBetween: 12 }
    }
}

@Component({
    components: { Carousel, CarouselSlide, BlockHeader, PostCard }
})
export default class BlockPosts extends Vue {
    @Prop({ type: String, required: true }) title!: string
    @Prop({ type: String, default: () => 'list' }) layout!: BlockPostsLayout
    @Prop({ type: Number, default: () => 1 }) mobileGridColumns!: BlockPostsMobileGridColumns
    @Prop({ type: Array, default: () => [] }) posts!: IPost[]

    @Ref() readonly carousel!: Carousel

    carouselOptions: SwiperOptions = {}

    get swiper (): Swiper {
        return this.carousel.swiper!
    }

    data (): Data {
        const swiperOptions: SwiperOptions = Object.assign(
            {},
            carouselOptionsBase,
            carouselOptionsByLayout[this.layout]
        )

        if (this.layout.startsWith('grid-')) {
            swiperOptions.breakpoints = Object.assign(
                {},
                swiperOptions.breakpoints,
                carouselBreakpointsByMobileGridColumns[this.mobileGridColumns]
            )
        }

        return {
            carouselOptions: swiperOptions
        }
    }

    handleNextClick (): void {
        this.swiper.slideNext()
    }

    handlePrevClick (): void {
        this.swiper.slidePrev()
    }
}

</script>
