<template>
    <div class="block">
        <div class="container">
            <div class="not-found">
                <div v-if="statusCode" class="not-found__404">
                    Oops! Error {{ statusCode }}
                </div>

                <div class="not-found__content">
                    <h1 class="not-found__title">
                        {{ statusCode === 404 ? 'Page Not Found' : message }}
                    </h1>

                    <template v-if="statusCode === 404">
                        <p class="not-found__text">
                            We can&apos;t seem to find the page you&apos;re looking for.
                            <br>
                            Try to use the search.
                        </p>

                        <form class="not-found__search">
                            <input
                                type="text"
                                class="not-found__search-input form-control"
                                placeholder="Search Query..."
                                aria-label="Search"
                            >
                            <button type="submit" class="not-found__search-button btn btn-primary">
                                Search
                            </button>
                        </form>

                        <p class="not-found__text">
                            Or go to the home page to start over.
                        </p>

                        <AppLink :to="$url.home()" class="btn btn-secondary btn-sm">
                            Go To Home Page
                        </AppLink>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import AppLink from '~/components/shared/app-link.vue'

@Component({
    components: { AppLink },
    head (this: ErrorLayout) {
        return {
            title: this.statusCode === 404 ? '404 Page Not Found' : this.message
        }
    }
})
export default class ErrorLayout extends Vue {
    @Prop({ type: Object, default: () => null }) readonly error!: {statusCode?: number; message?: string} | null

    get statusCode () {
        return (this.error && this.error.statusCode) || 500
    }

    get message () {
        return (this.error && this.error.message) || '<%= messages.client_error %>'
    }
}

</script>
