<template>
    <div>
        <PageHeader
            :breadcrumb="[
                { title: 'Home', url: '' },
                { title: 'Track Order', url: '' },
            ]"
        />

        <div class="block">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-5 col-lg-6 col-md-8">
                        <div class="card flex-grow-1 mb-0 mt-lg-4 mt-md-3 mt-2">
                            <div class="card-body">
                                <div class="card-title text-center">
                                    <h1 class="pt-lg-0 pt-2">
                                        Track Order
                                    </h1>
                                </div>
                                <p class="mb-4 pt-2">
                                    Vestibulum sem odio, ullamcorper a imperdiet tincidunt
                                    sed magna felis, consequat a erat ut, rutrum finibus
                                    odio.
                                </p>
                                <form>
                                    <div class="form-group">
                                        <label for="track-order-id">Order ID</label>
                                        <input
                                            id="track-order-id"
                                            class="form-control"
                                            type="text"
                                            placeholder="Order ID"
                                        >
                                    </div>
                                    <div class="form-group">
                                        <label for="track-email">Email address</label>
                                        <input
                                            id="track-email"
                                            class="form-control"
                                            type="email"
                                            placeholder="Email address"
                                        >
                                    </div>
                                    <div class="pt-3">
                                        <button type="submit" class="btn btn-primary btn-lg btn-block">
                                            Track
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import PageHeader from '~/components/shared/page-header.vue'

@Component({
    components: { PageHeader },
    head () {
        return {
            title: 'Track Order'
        }
    }
})
export default class Page extends Vue { }

</script>
