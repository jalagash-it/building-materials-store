<template>
    <div
        v-if="address !== null"
        :class="[
            'card',
            'address-card',
            {'address-card--featured': featured}
        ]"
    >
        <div class="address-card__body">
            <div
                v-if="badge"
                :class="[
                    'address-card__badge',
                    {'address-card__badge--muted': badgeMuted}
                ]"
            >
                {{ badge }}
            </div>
            <div class="address-card__name">
                {{ address.firstName }}
                {{ address.lastName }}
            </div>
            <div class="address-card__row">
                {{ address.country }}
                <br>
                {{ address.postcode }},
                {{ address.city }}
                <br>
                {{ address.address }}
            </div>
            <div class="address-card__row">
                <div class="address-card__row-title">
                    Phone Number
                </div>
                <div class="address-card__row-content">
                    {{ address.phone }}
                </div>
            </div>
            <div class="address-card__row">
                <div class="address-card__row-title">
                    Email Address
                </div>
                <div class="address-card__row-content">
                    {{ address.email }}
                </div>
            </div>
            <div v-if="$slots.default" class="address-card__footer">
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IAddress } from '~/interfaces/address'

@Component
export default class AddressCard extends Vue {
    @Prop({ type: Object, required: true }) readonly address!: IAddress
    @Prop({ type: Boolean, default: () => false }) readonly featured!: boolean
    @Prop({ type: String, default: () => '' }) readonly badge!: string
    @Prop({ type: Boolean, default: () => false }) readonly badgeMuted!: boolean
}

</script>
