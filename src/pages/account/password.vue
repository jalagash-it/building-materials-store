<template>
    <AccountLayout>
        <div class="card">
            <div class="card-header">
                <h5>Change Password</h5>
            </div>
            <div class="card-divider" />
            <div class="card-body">
                <div class="row no-gutters">
                    <div class="col-12 col-lg-7 col-xl-6">
                        <div class="form-group">
                            <label for="password-current">Current Password</label>
                            <input
                                id="password-current"
                                class="form-control"
                                type="password"
                                placeholder="Current Password"
                            >
                        </div>
                        <div class="form-group">
                            <label for="password-new">New Password</label>
                            <input
                                id="password-new"
                                class="form-control"
                                type="password"
                                placeholder="New Password"
                            >
                        </div>
                        <div class="form-group">
                            <label for="password-confirm">Reenter New Password</label>
                            <input
                                id="password-confirm"
                                class="form-control"
                                type="password"
                                placeholder="Reenter New Password"
                            >
                        </div>

                        <div class="form-group mt-5 mb-0">
                            <button type="button" class="btn btn-primary">
                                Change
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
    head: { title: 'Change Password' }
})
export default class Page extends Vue { }

</script>
