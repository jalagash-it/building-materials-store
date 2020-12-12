<template>
    <AccountLayout>
        <div class="card">
            <div class="card-header">
                <h5>Edit Profile</h5>
            </div>
            <div class="card-divider" />
            <div class="card-body">
                <div class="row no-gutters">
                    <div class="col-12 col-lg-7 col-xl-6">
                        <div class="form-group">
                            <label for="profile-first-name">First Name</label>
                            <input
                                id="profile-first-name"
                                type="text"
                                class="form-control"
                                placeholder="First Name"
                            >
                        </div>
                        <div class="form-group">
                            <label for="profile-last-name">Last Name</label>
                            <input
                                id="profile-last-name"
                                type="text"
                                class="form-control"
                                placeholder="Last Name"
                            >
                        </div>
                        <div class="form-group">
                            <label for="profile-email">Email Address</label>
                            <input
                                id="profile-email"
                                type="email"
                                class="form-control"
                                placeholder="Email Address"
                            >
                        </div>
                        <div class="form-group">
                            <label for="profile-phone">Phone Number</label>
                            <input
                                id="profile-phone"
                                type="text"
                                class="form-control"
                                placeholder="Phone Number"
                            >
                        </div>

                        <div class="form-group mt-5 mb-0">
                            <button type="button" class="btn btn-primary">
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
    head: { title: 'Profile' }
})
export default class Page extends Vue { }

</script>
