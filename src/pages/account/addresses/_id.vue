<template>
    <AccountLayout>
        <div class="card">
            <div class="card-header">
                <h5>Edit Address</h5>
            </div>
            <div class="card-divider" />
            <div class="card-body">
                <div class="row no-gutters">
                    <div class="col-12 col-lg-10 col-xl-8">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="checkout-first-name">First Name</label>
                                <input
                                    id="checkout-first-name"
                                    class="form-control"
                                    type="text"
                                    placeholder="First Name"
                                >
                            </div>
                            <div class="form-group col-md-6">
                                <label for="checkout-last-name">Last Name</label>
                                <input
                                    id="checkout-last-name"
                                    class="form-control"
                                    type="text"
                                    placeholder="Last Name"
                                >
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="checkout-company-name">
                                Company Name
                                <span class="text-muted">(Optional)</span>
                            </label>
                            <input
                                id="checkout-company-name"
                                class="form-control"
                                type="text"
                                placeholder="Company Name"
                            >
                        </div>
                        <div class="form-group">
                            <label for="checkout-country">Country</label>
                            <select id="checkout-country" class="form-control form-control-select2">
                                <option>Select a country...</option>
                                <option>United States</option>
                                <option>Russia</option>
                                <option>Italy</option>
                                <option>France</option>
                                <option>Ukraine</option>
                                <option>Germany</option>
                                <option>Australia</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="checkout-street-address">Street Address</label>
                            <input
                                id="checkout-street-address"
                                class="form-control"
                                type="text"
                                placeholder="Street Address"
                            >
                        </div>
                        <div class="form-group">
                            <label for="checkout-address">
                                Apartment, suite, unit etc.
                                <span class="text-muted">(Optional)</span>
                            </label>
                            <input
                                id="checkout-address"
                                class="form-control"
                                type="text"
                            >
                        </div>
                        <div class="form-group">
                            <label for="checkout-city">Town / City</label>
                            <input
                                id="checkout-city"
                                class="form-control"
                                type="text"
                            >
                        </div>
                        <div class="form-group">
                            <label for="checkout-state">State / County</label>
                            <input
                                id="checkout-state"
                                class="form-control"
                                type="text"
                            >
                        </div>
                        <div class="form-group">
                            <label for="checkout-postcode">Postcode / ZIP</label>
                            <input
                                id="checkout-postcode"
                                class="form-control"
                                type="text"
                            >
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="checkout-email">Email address</label>
                                <input
                                    id="checkout-email"
                                    class="form-control"
                                    type="email"
                                    placeholder="Email address"
                                >
                            </div>
                            <div class="form-group col-md-6">
                                <label for="checkout-phone">Phone</label>
                                <input
                                    id="checkout-phone"
                                    class="form-control"
                                    type="text"
                                    placeholder="Phone"
                                >
                            </div>
                        </div>

                        <div class="form-group mt-3 mb-0">
                            <button class="btn btn-primary" type="button">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AccountLayout>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import AccountLayout from '~/components/account/account-layout.vue'

@Component({
    components: { AccountLayout },
    head: { title: 'Edit Address' }
})
export default class Page extends Vue { }

</script>
