<template>
    <div>
        <PageHeader
            title="My Account"
            :breadcrumb="[
                {title: 'Home', url: ''},
                {title: 'Breadcrumb', url: ''},
                {title: 'My Account', url: ''},
            ]"
        />

        <div class="block">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-3 d-flex">
                        <div class="account-nav flex-grow-1">
                            <h4 class="account-nav__title">
                                Navigation
                            </h4>
                            <ul>
                                <NuxtLink
                                    v-for="(item, index) in items"
                                    v-slot="{ isActive }"
                                    :key="index"
                                    :to="$url.lang(item.link)"
                                    :exact="true"
                                >
                                    <li
                                        :class="[
                                            'account-nav__item',
                                            {'account-nav__item--active': isActive}
                                        ]"
                                    >
                                        <AppLink :to="item.link">
                                            {{ item.title }}
                                        </AppLink>
                                    </li>
                                </NuxtLink>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 col-lg-9 mt-4 mt-lg-0">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import PageHeader from '~/components/shared/page-header.vue'
import AppLink from '~/components/shared/app-link.vue'

@Component({
    components: { PageHeader, AppLink }
})
export default class AccountLayout extends Vue {
    data () {
        return {
            items: [
                { title: 'Dashboard', link: this.$url.accountDashboard() },
                { title: 'Edit Profile', link: this.$url.accountProfile() },
                { title: 'Order History', link: this.$url.accountOrders() },
                { title: 'Order Details', link: this.$url.accountOrder({ id: 5 }) },
                { title: 'Addresses', link: this.$url.accountAddresses() },
                { title: 'Edit Address', link: this.$url.accountAddress({ id: 5 }) },
                { title: 'Password', link: this.$url.accountPassword() },
                { title: 'Logout', link: this.$url.signIn() }
            ]
        }
    }
}

</script>
