<template>
    <div>
        <BlockMap />

        <PageHeader
            title="Contact Us"
            :breadcrumb="[
                { title: 'Home', url: '' },
                { title: 'Contact Us', url: '' },
            ]"
        />

        <div class="block">
            <div class="container">
                <div class="card mb-0">
                    <div class="card-body contact-us">
                        <div class="contact-us__container">
                            <div class="row">
                                <div class="col-12 col-lg-6 pb-4 pb-lg-0">
                                    <h4 class="contact-us__header card-title">
                                        Our Address
                                    </h4>

                                    <div class="contact-us__address">
                                        <p>
                                            715 Fake Ave, Apt. 34, New York, NY 10021 USA
                                            <br>
                                            Email: stroyka@example.com
                                            <br>
                                            Phone Number: +1 754 000-00-00
                                        </p>

                                        <p>
                                            <strong>Opening Hours</strong>
                                            <br>
                                            Monday to Friday: 8am-8pm
                                            <br>
                                            Saturday: 8am-6pm
                                            <br>
                                            Sunday: 10am-4pm
                                        </p>

                                        <p>
                                            <strong>Comment</strong>
                                            <br>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit. Curabitur suscipit suscipit mi, non tempor
                                            nulla finibus eget. Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </div>

                                <div class="col-12 col-lg-6">
                                    <h4 class="contact-us__header card-title">
                                        Leave us a Message
                                    </h4>

                                    <form>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="form-name">Your Name</label>
                                                <input
                                                    id="form-name"
                                                    class="form-control"
                                                    type="text"
                                                    placeholder="Your Name"
                                                >
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="form-email">Email</label>
                                                <input
                                                    id="form-email"
                                                    class="form-control"
                                                    type="email"
                                                    placeholder="Email Address"
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="form-subject">Subject</label>
                                            <input
                                                id="form-subject"
                                                class="form-control"
                                                type="text"
                                                placeholder="Subject"
                                            >
                                        </div>
                                        <div class="form-group">
                                            <label for="form-message">Message</label>
                                            <textarea id="form-message" class="form-control" :rows="4" />
                                        </div>
                                        <button type="submit" class="btn btn-primary">
                                            Send Message
                                        </button>
                                    </form>
                                </div>
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
import BlockMap from '~/components/blocks/block-map.vue'

@Component({
    components: { PageHeader, BlockMap },
    head () {
        return {
            title: 'Contact Us'
        }
    }
})
export default class SitePageContactUs extends Vue { }

</script>
