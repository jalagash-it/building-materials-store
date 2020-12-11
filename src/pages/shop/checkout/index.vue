<template>
    <div>
        <client-only>
            <PageHeader
                title="Checkout"
                :breadcrumb="[
                    { title: 'Home', url: $url.home() },
                    { title: 'Shopping Cart', url: $url.cart() },
                    { title: 'Checkout', url: '' },
                ]"
            />

            <div class="checkout block">
                <div class="container">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <div class="alert alert-primary alert-lg">
                                Returning customer?
                                <AppLink :to="$url.signIn()">
                                    Click here to login
                                </AppLink>
                            </div>
                        </div>

                        <div class="col-12 col-lg-6 col-xl-7">
                            <div class="card mb-lg-0">
                                <div class="card-body">
                                    <h3 class="card-title">
                                        Billing details
                                    </h3>
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
                                        <select id="checkout-country" class="form-control">
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

                                    <div class="form-group">
                                        <div class="form-check">
                                            <span class="form-check-input input-check">
                                                <span class="input-check__body">
                                                    <input
                                                        id="checkout-create-account"
                                                        class="input-check__input"
                                                        type="checkbox"
                                                    >
                                                    <span class="input-check__box" />
                                                    <Check9x7Svg class="input-check__icon" />
                                                </span>
                                            </span>
                                            <label class="form-check-label" for="checkout-create-account">
                                                Create an account?
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-divider" />
                                <div class="card-body">
                                    <h3 class="card-title">
                                        Shipping Details
                                    </h3>

                                    <div class="form-group">
                                        <div class="form-check">
                                            <span class="form-check-input input-check">
                                                <span class="input-check__body">
                                                    <input
                                                        id="checkout-different-address"
                                                        class="input-check__input"
                                                        type="checkbox"
                                                    >
                                                    <span class="input-check__box" />
                                                    <Check9x7Svg class="input-check__icon" />
                                                </span>
                                            </span>
                                            <label class="form-check-label" for="checkout-different-address">
                                                Ship to a different address?
                                            </label>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="checkout-comment">
                                            Order notes
                                            <span class="text-muted">(Optional)</span>
                                        </label>
                                        <textarea id="checkout-comment" class="form-control" :rows="4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                            <div class="card mb-0">
                                <div class="card-body">
                                    <h3 class="card-title">
                                        Your Order
                                    </h3>

                                    <table class="checkout__totals">
                                        <thead class="checkout__totals-header">
                                            <tr>
                                                <th>Product</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody class="checkout__totals-products">
                                            <tr v-for="item in cart.items" :key="item.id">
                                                <td>{{ item.product.name }} × {{ item.quantity }}</td>
                                                <td>{{ $price(item.total) }}</td>
                                            </tr>
                                        </tbody>
                                        <tbody v-if="cart.totals.length > 0" class="checkout__totals-subtotals">
                                            <tr>
                                                <th>Subtotal</th>
                                                <td>{{ $price(cart.subtotal) }}</td>
                                            </tr>
                                            <tr v-for="(total, index) in cart.totals" :key="index">
                                                <th>{{ total.title }}</th>
                                                <td>{{ $price(total.price) }}</td>
                                            </tr>
                                        </tbody>
                                        <tfoot class="checkout__totals-footer">
                                            <tr>
                                                <th>Total</th>
                                                <td>{{ $price(cart.total) }}</td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <div class="payment-methods">
                                        <ul class="payment-methods__list">
                                            <Collapse
                                                v-for="(payment, index) in payments"
                                                :key="index"
                                                v-slot:default="{ itemClasses, contentClasses }"
                                                :is-open="currentPayment === payment.key"
                                                item-open-class="payment-methods__item--active"
                                            >
                                                <li :class="['payment-methods__item', itemClasses]">
                                                    <label class="payment-methods__item-header">
                                                        <span class="payment-methods__item-radio input-radio">
                                                            <span class="input-radio__body">
                                                                <input
                                                                    type="radio"
                                                                    class="input-radio__input"
                                                                    name="checkout_payment_method"
                                                                    :value="payment.key"
                                                                    :checked="currentPayment === payment.key"
                                                                    @change="handlePaymentChange"
                                                                    @click="handlePaymentClick"
                                                                >
                                                                <span class="input-radio__circle" />
                                                            </span>
                                                        </span>
                                                        <span class="payment-methods__item-title">
                                                            {{ payment.title }}
                                                        </span>
                                                    </label>
                                                    <div :class="['payment-methods__item-container', contentClasses]">
                                                        <div class="payment-methods__item-description text-muted">
                                                            {{ payment.description }}
                                                        </div>
                                                    </div>
                                                </li>
                                            </Collapse>
                                        </ul>
                                    </div>

                                    <div class="checkout__agree form-group">
                                        <div class="form-check">
                                            <span class="form-check-input input-check">
                                                <span class="input-check__body">
                                                    <input
                                                        id="checkout-terms"
                                                        class="input-check__input"
                                                        type="checkbox"
                                                    >
                                                    <span class="input-check__box" />
                                                    <Check9x7Svg class="input-check__icon" />
                                                </span>
                                            </span>
                                            <label class="form-check-label" for="checkout-terms">
                                                I have read and agree to the website
                                                <AppLink :to="$url.terms()">
                                                    terms and conditions
                                                </AppLink>
                                                *
                                            </label>
                                        </div>
                                    </div>

                                    <button type="submit" class="btn btn-primary btn-xl btn-block">
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </client-only>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { IPayment } from '~/interfaces/payment'
import { RootState } from '~/store'
import { Cart } from '~/interfaces/cart'
import PageHeader from '~/components/shared/page-header.vue'
import AppLink from '~/components/shared/app-link.vue'
import Collapse from '~/components/shared/collapse.vue'
import Check9x7Svg from '~/svg/check-9x7.svg'
import dataShopPayments from '~/data/shopPayments'

@Component({
    components: { PageHeader, AppLink, Check9x7Svg, Collapse },
    head () {
        return {
            title: 'Checkout'
        }
    }
})
export default class Page extends Vue {
    @State((store: RootState) => store.cart) cart!: Cart

    currentPayment: string = dataShopPayments[0].key

    payments: IPayment[] = dataShopPayments

    clickTimer: any = null

    // noinspection JSUnusedGlobalSymbols
    beforeMount () {
        if (this.cart.quantity < 1) {
            this.$router.push(this.$url.cart())
        }
    }

    handlePaymentChange (event: InputEvent) {
        if (event.target instanceof HTMLInputElement) {
            this.currentPayment = event.target.value
        }
    }

    // prevents unwanted scrolling
    handlePaymentClick (event: InputEvent) {
        const input = event.target

        clearTimeout(this.clickTimer)

        if (input instanceof HTMLInputElement) {
            input.blur()

            this.clickTimer = setTimeout(() => {
                input.focus()
            }, 500)
        }
    }
}

</script>
