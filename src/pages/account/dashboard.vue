<template>
    <AccountLayout>
        <div class="dashboard">
            <div class="dashboard__profile card profile-card">
                <div class="card-body profile-card__body">
                    <div class="profile-card__avatar">
                        <img :src="$url.img('/images/avatars/avatar-3.jpg')" alt="">
                    </div>
                    <div class="profile-card__name">
                        Helena Garcia
                    </div>
                    <div class="profile-card__email">
                        stroyka@example.com
                    </div>
                    <div class="profile-card__edit">
                        <AppLink :to="$url.accountProfile()" class="btn btn-secondary btn-sm">
                            Edit Profile
                        </AppLink>
                    </div>
                </div>
            </div>

            <AddressCard
                :address="address"
                class="dashboard__address"
                featured
                :badge="address.default ? 'Default Address' : ''"
            >
                <AppLink :to="$url.accountAddress({ id: 5 })">
                    Edit Address
                </AppLink>
            </AddressCard>

            <div class="dashboard__orders card">
                <div class="card-header">
                    <h5>Recent Orders</h5>
                </div>
                <div class="card-divider" />
                <div class="card-table">
                    <div class="table-responsive-sm mb-0">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="order in orders" :key="order.id">
                                    <td>
                                        <AppLink :to="$url.accountOrder({ id: 5 })">
                                            #{{ order.id }}
                                        </AppLink>
                                    </td>
                                    <td>{{ order.date }}</td>
                                    <td>{{ order.status }}</td>
                                    <td>
                                        {{ $price(order.total) }}
                                        for
                                        {{ order.quantity }}
                                        item(s)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AccountLayout>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { IUserAddress } from '~/interfaces/address'
import { IOrderSummary } from '~/interfaces/order'
import AppLink from '~/components/shared/app-link.vue'
import AddressCard from '~/components/shared/address-card.vue'
import AccountLayout from '~/components/account/account-layout.vue'
import dataAccountAddresses from '~/data/accountAddresses'
import dataAccountOrders from '~/data/accountOrders'

@Component({
    components: { AppLink, AddressCard, AccountLayout },
    head: { title: 'My Account' }
})
export default class Page extends Vue {
    address: IUserAddress = dataAccountAddresses[0]

    orders: IOrderSummary[] = dataAccountOrders.slice(0, 3)
}

</script>
