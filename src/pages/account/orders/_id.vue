<template>
    <AccountLayout>
        <div class="card">
            <div class="order-header">
                <div class="order-header__actions">
                    <AppLink :to="$url.accountOrders()" class="btn btn-xs btn-secondary">
                        Back to list
                    </AppLink>
                </div>
                <h5 class="order-header__title">
                    Order #{{ order.id }}
                </h5>
                <div class="order-header__subtitle">
                    Was placed on
                    <mark class="order-header__date">{{ order.date }}</mark>
                    and is currently
                    <mark class="order-header__status">{{ order.status }}</mark>.
                </div>
            </div>
            <div class="card-divider" />
            <div class="card-table">
                <div class="table-responsive-sm mb-0">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody class="card-table__body card-table__body--merge-rows">
                            <tr v-for="item in order.items" :key="item.id">
                                <td>{{ item.name }} × {{ item.quantity }}</td>
                                <td>{{ $price(item.total) }}</td>
                            </tr>
                        </tbody>
                        <tbody
                            v-if="order.additionalLines.length > 0"
                            class="card-table__body card-table__body--merge-rows"
                        >
                            <tr>
                                <th>Subtotal</th>
                                <td>{{ $price(order.subtotal) }}</td>
                            </tr>
                            <tr v-for="(item, index) in order.additionalLines" :key="index">
                                <th>{{ item.label }}</th>
                                <td>{{ $price(item.total) }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <td>{{ $price(order.total) }}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>

        <div class="row mt-3 no-gutters mx-n2">
            <div class="col-sm-6 col-12 px-2">
                <AddressCard :address="order.shippingAddress" featured badge="Shipping Address" badge-muted />
            </div>
            <div class="col-sm-6 col-12 px-2 mt-sm-0 mt-3">
                <AddressCard :address="order.billingAddress" featured badge="Billing Address" badge-muted />
            </div>
        </div>
    </AccountLayout>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { IOrder } from '~/interfaces/order'
import AppLink from '~/components/shared/app-link.vue'
import AddressCard from '~/components/shared/address-card.vue'
import AccountLayout from '~/components/account/account-layout.vue'
import dataAccountOrderDetails from '~/data/accountOrderDetails'

@Component({
    components: { AppLink, AddressCard, AccountLayout },
    head: { title: 'Order Details' }
})
export default class Page extends Vue {
    order: IOrder = dataAccountOrderDetails
}

</script>
