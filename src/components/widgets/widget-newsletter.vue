<template>
    <div class="widget-newsletter widget">
        <h4 class="widget-newsletter__title">
            Our Newsletter
        </h4>
        <div class="widget-newsletter__text">
            Phasellus eleifend sapien felis, at sollicitudin arcu semper mattis. Mauris quis mi
            quis ipsum tristique lobortis. Nulla vitae est blandit rutrum.
        </div>
        <form class="widget-newsletter__form" action="">
            <label for="widget-newsletter-email" class="sr-only">Email Address</label>
            <input id="widget-newsletter-email" type="text" class="form-control" placeholder="Email Address">
            <button type="submit" class="btn btn-primary mt-3">
                Subscribe
            </button>
        </form>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class WidgetNewsletter extends Vue { }

</script>
