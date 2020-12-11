<template>
    <AccountLayout>
        <div class="addresses-list">
            <AppLink to="/" class="addresses-list__item addresses-list__item--new">
                <div class="addresses-list__plus" />
                <div class="btn btn-secondary btn-sm">
                    Add New
                </div>
            </AppLink>

            <div class="addresses-list__divider" />
            <template v-for="address in addresses">
                <AddressCard
                    :key="address.id"
                    :address="address"
                    :badge="address.default ? 'Default' : ''"
                    class="addresses-list__item"
                >
                    <AppLink :to="$url.accountAddress(address)">
                        Edit
                    </AppLink>
                    &nbsp;&nbsp;
                    <AppLink to="/">
                        Remove
                    </AppLink>
                </AddressCard>
                <div :key="address.id + '-divider'" class="addresses-list__divider" />
            </template>
        </div>
    </AccountLayout>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { IUserAddress } from '~/interfaces/address'
import AppLink from '~/components/shared/app-link.vue'
import AddressCard from '~/components/shared/address-card.vue'
import AccountLayout from '~/components/account/account-layout.vue'
import dataAccountAddresses from '~/data/accountAddresses'

@Component({
    components: { AppLink, AddressCard, AccountLayout },
    head: { title: 'Address List' }
})
export default class Page extends Vue {
    addresses: IUserAddress[] = dataAccountAddresses
}

</script>
