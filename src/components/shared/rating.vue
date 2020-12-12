<template>
    <div class="rating">
        <div class="rating__body">
            <Rating13x12Svg
                v-for="rating in stars"
                :key="rating"
                :class="[
                    'rating__star',
                    {'rating__star--active': value >= rating}
                ]"
            />
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import Rating13x12Svg from '~/svg/rating-13x12.svg'

@Component({
    components: { Rating13x12Svg }
})
export default class Rating extends Vue {
    @Prop({ type: Number, default: () => 0 }) readonly value!: number

    stars = [1, 2, 3, 4, 5]
}

</script>
