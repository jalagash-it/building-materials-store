<template>
    <div class="block order-success">
        <div class="container">
            <div class="order-success__body">
                <div class="order-success__header">
                    <Check100Svg class="order-success__icon" />
                    <h1 class="order-success__title">
                        Thank you
                    </h1>
                    <div class="order-success__subtitle">
                        Your order has been received
                    </div>
                    <div class="order-success__actions">
                        <AppLink to="/" class="btn btn-xs btn-secondary">
                            Go To Homepage
                        </AppLink>
                    </div>
                </div>

                <div class="order-success__meta">
                    <ul class="order-success__meta-list">
                        <li class="order-success__meta-item">
                            <span class="order-success__meta-title">Order number:</span>
                            <span class="order-success__meta-value">#{{ order.id }}</span>
                        </li>
                        <li class="order-success__meta-item">
                            <span class="order-success__meta-title">Created at:</span>
                            <span class="order-success__meta-value">{{ order.date }}</span>
                        </li>
                        <li class="order-success__meta-item">
                            <span class="order-success__meta-title">Total:</span>
                            <span class="order-success__meta-value">{{ order.total }}</span>
                        </li>
                        <li class="order-success__meta-item">
                            <span class="order-success__meta-title">Payment method:</span>
                            <span class="order-success__meta-value">{{ order.paymentMethod }}</span>
                        </li>
                    </ul>
                </div>

                <div class="card">
                    <div class="order-list">
                        <table>
                            <thead class="order-list__header">
                                <tr>
                                    <th class="order-list__column-label" :colspan="2">
                                        Product
                                    </th>
                                    <th class="order-list__column-quantity">
                                        Qty
                                    </th>
                                    <th class="order-list__column-total">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="order-list__products">
                                <tr v-for="(item, itemIndex) in order.items" :key="itemIndex">
                                    <td class="order-list__column-image">
                                        <div class="product-image">
                                            <AppLink :to="$url.product(item)" class="product-image__body">
                                                <!--suppress HtmlUnknownTarget -->
                                                <img class="product-image__img" :src="$url.img(item.image)" alt="">
                                            </AppLink>
                                        </div>
                                    </td>
                                    <td class="order-list__column-product">
                                        <AppLink :to="$url.product(item)">
                                            {{ item.name }}
                                        </AppLink>
                                        <div
                                            v-if="item.options && item.options.length > 0"
                                            class="order-list__options"
                                        >
                                            <ul class="order-list__options-list">
                                                <li
                                                    v-for="(option, optionIndex) in (item.options || [])"
                                                    :key="optionIndex"
                                                    class="order-list__options-item"
                                                >
                                                    <span class="order-list__options-label">
                                                        {{ option.label }}:
                                                    </span>
                                                    <span class="order-list__options-value">{{ option.value }}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="order-list__column-quantity" data-title="Qty:">
                                        {{ item.quantity }}
                                    </td>
                                    <td class="order-list__column-total">
                                        {{ $price(item.total) }}
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-if="order.additionalLines.length > 0" class="order-list__subtotals">
                                <tr>
                                    <th class="order-list__column-label" :colspan="3">
                                        Subtotal
                                    </th>
                                    <td class="order-list__column-total">
                                        {{ $price(order.subtotal) }}
                                    </td>
                                </tr>
                                <tr v-for="(line, index) in order.additionalLines" :key="index">
                                    <th class="order-list__column-label" :colspan="3">
                                        {{ line.label }}
                                    </th>
                                    <td class="order-list__column-total">
                                        {{ $price(line.total) }}
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot class="order-list__footer">
                                <tr>
                                    <th class="order-list__column-label" :colspan="3">
                                        Total
                                    </th>
                                    <td class="order-list__column-total">
                                        {{ $price(order.total) }}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div class="row mt-3 no-gutters mx-n2">
                    <div class="col-sm-6 col-12 px-2">
                        <AddressCard
                            :address="order.shippingAddress"
                            badge="Shipping Address"
                            :badge-muted="true"
                        />
                    </div>
                    <div class="col-sm-6 col-12 px-2 mt-sm-0 mt-3">
                        <AddressCard
                            :address="order.billingAddress"
                            badge="Billing Address"
                            :badge-muted="true"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { IOrder } from '~/interfaces/order'
import AppLink from '~/components/shared/app-link.vue'
import AddressCard from '~/components/shared/address-card.vue'
import Check100Svg from '~/svg/check-100.svg'
import dataAccountOrderDetails from '~/data/accountOrderDetails'

@Component({
    components: { Check100Svg, AppLink, AddressCard },
    head () {
        return {
            title: 'Order Success'
        }
    }
})
export default class Page extends Vue {
    order: IOrder = dataAccountOrderDetails
}

</script>
