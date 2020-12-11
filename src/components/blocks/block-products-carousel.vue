<template>
    <div
        :class="[
            'block block-products-carousel',
            {
                'block-products-carousel--loading': loading,
                'block-products-carousel--has-items': columns.length > 0,
            }
        ]"
        :data-layout="layout"
        :data-mobile-grid-columns="mobileGridColumns"
    >
        <div :class="{container: !withSidebar}">
            <BlockHeader
                :title="title"
                :groups="groups"
                arrows
                @next="handleNextClick"
                @prev="handlePrevClick"
                @group-click="$emit('groupClick', $event)"
            />

            <div class="block-products-carousel__slider">
                <div class="block-products-carousel__preloader" />

                <Carousel ref="carousel" :options="carouselOptions">
                    <CarouselSlide v-for="(column, index) in columns" :key="index">
                        <div class="block-products-carousel__column">
                            <div v-for="product in column" :key="product.id" class="block-products-carousel__cell">
                                <ProductCard :product="product" />
                            </div>
                        </div>
                    </CarouselSlide>
                </Carousel>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { Swiper } from 'swiper'
import { SwiperOptions } from 'swiper/types/swiper-options'
import { IProduct } from '~/interfaces/product'
import { BlockHeaderGroup } from '~/interfaces/components'
import BlockHeader from '~/components/shared/block-header.vue'
import Carousel from '~/components/shared/carousel.vue'
import CarouselSlide from '~/components/shared/carousel-slide.vue'
import ProductCard from '~/components/shared/product-card.vue'

type BlockProductsCarouselLayout = 'grid-4' | 'grid-4-sm' | 'grid-5' | 'horizontal';
type BlockProductsCarouselMobileGridColumns = 1 | 2;

interface Data {
    columns: IProduct[][]
    carouselOptions: SwiperOptions
}

function buildColumns (rows: number, products: IProduct[]): IProduct[][] {
    const columns = []

    if (rows > 0) {
        const productsQueue = products.slice()

        while (productsQueue.length > 0) {
            columns.push(productsQueue.splice(0, rows))
        }
    }

    return columns
}

const carouselOptionsBase: SwiperOptions = {
    pagination: {},
    roundLengths: true
}
const carouselOptionsByLayout: { [layout: string]: SwiperOptions } = {
    'grid-4': {
        breakpoints: {
            1200: { slidesPerView: 4, spaceBetween: 14 },
            992: { slidesPerView: 4, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 }
        }
    },
    'grid-4-sm': {
        breakpoints: {
            1200: { slidesPerView: 4, spaceBetween: 14 },
            992: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 }
        }
    },
    'grid-5': {
        breakpoints: {
            1200: { slidesPerView: 5, spaceBetween: 12 },
            992: { slidesPerView: 4, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 }
        }
    },
    horizontal: {
        // items: 3,
        breakpoints: {
            1200: { slidesPerView: 3, spaceBetween: 14 },
            992: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 10 },
            576: { slidesPerView: 1 },
            475: { slidesPerView: 1 },
            0: { slidesPerView: 1 }
        }
    }
}
const carouselBreakpointsByMobileGridColumns: { [columns: number]: SwiperOptions['breakpoints'] } = {
    1: {
        475: { slidesPerView: 2, spaceBetween: 10 },
        0: { slidesPerView: 1, spaceBetween: 14 }
    },
    2: {
        420: { slidesPerView: 2, spaceBetween: 10 },
        320: { slidesPerView: 2, spaceBetween: 0 },
        0: { slidesPerView: 1, spaceBetween: 0 }
    }
}

@Component({
    components: { BlockHeader, Carousel, CarouselSlide, ProductCard }
})
export default class BlockProductsCarousel extends Vue {
    @Prop({ type: String, required: true }) readonly title!: string
    @Prop({ type: String, default: () => 'grid-4' }) readonly layout!: BlockProductsCarouselLayout
    @Prop({ type: Number, default: () => 1 }) readonly mobileGridColumns!: BlockProductsCarouselMobileGridColumns
    @Prop({ type: Number, default: () => 1 }) readonly rows!: number
    @Prop({ type: Array, default: () => [] }) readonly products!: IProduct[]
    @Prop({ type: Array, default: () => [] }) readonly groups!: BlockHeaderGroup[]
    @Prop({ type: Boolean, default: () => false }) readonly withSidebar!: boolean
    @Prop({ type: Boolean, default: () => false }) readonly loading!: boolean

    @Ref() readonly carousel!: Carousel

    columns: IProduct[][] = []
    updateCarousel: boolean = false
    carouselOptions: SwiperOptions = {}

    get swiper (): Swiper {
        return this.carousel.swiper!
    }

    data (): Data {
        const swiperOptions = Object.assign(
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
            columns: buildColumns(this.rows, this.products),
            carouselOptions: swiperOptions
        }
    }

    @Watch('rows')
    @Watch('products')
    onRowsOrProductsChange () {
        this.columns = buildColumns(this.rows, this.products)
        this.updateCarousel = true
    }

    // noinspection JSUnusedGlobalSymbols
    updated () {
        if (this.updateCarousel) {
            this.updateCarousel = false

            this.swiper.update()
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
