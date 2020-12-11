<template>
    <div>
        <PageHeader
            title="Components"
            :breadcrumb="[
                { title: 'Home', url: '' },
                { title: 'Components', url: '' },
            ]"
        />

        <div class="block">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="alert alert-primary alert-lg mb-3 alert-dismissible fade show">
                            A simple large alert with
                            <AppLink to="/">
                                an example link
                            </AppLink>
                            . Give it a click if you like.

                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <Cross12Svg />
                            </button>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="alert alert-info mb-3">
                            A simple alert with
                            <AppLink to="/">
                                an example link
                            </AppLink>
                            . Give it a click if you like.
                        </div>
                        <div class="alert alert-primary mb-3">
                            A simple alert with
                            <AppLink to="/">
                                an example link
                            </AppLink>
                            . Give it a click if you like.
                        </div>
                        <div class="alert alert-secondary mb-3 mb-md-5">
                            A simple alert with
                            <AppLink to="/">
                                an example link
                            </AppLink>
                            . Give it a click if you like.
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="alert alert-success mb-3">
                            A simple alert with
                            <AppLink to="/">
                                an example link
                            </AppLink>
                            . Give it a click if you like.
                        </div>
                        <div class="alert alert-danger mb-3">
                            A simple alert with
                            <AppLink to="/">
                                an example link
                            </AppLink>
                            . Give it a click if you like.
                        </div>
                        <div class="alert alert-warning mb-5">
                            A simple alert with
                            <AppLink to="/">
                                an example link
                            </AppLink>
                            . Give it a click if you like.
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-4">
                        <p><strong>Text Field</strong></p>

                        <div class="form-group">
                            <label for="input-default">Default</label>
                            <input
                                id="input-default"
                                class="form-control"
                                type="text"
                                placeholder="Placeholder"
                            >
                        </div>
                        <div class="form-group">
                            <label for="input-readonly">Readonly</label>
                            <input
                                id="input-readonly"
                                class="form-control"
                                type="text"
                                placeholder="Placeholder"
                                readOnly
                            >
                        </div>
                        <div class="form-group">
                            <label for="input-disabled">Disabled</label>
                            <input
                                id="input-disabled"
                                class="form-control"
                                type="text"
                                placeholder="Placeholder"
                                disabled
                            >
                        </div>
                        <div class="form-group">
                            <label for="input-success">Success</label>
                            <input
                                id="input-success"
                                class="form-control is-valid"
                                type="text"
                                placeholder="Placeholder"
                            >
                            <div class="valid-feedback">
                                Example invalid feedback text
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="input-error">Error</label>
                            <input
                                id="input-error"
                                class="form-control is-invalid"
                                type="text"
                                placeholder="Placeholder"
                            >
                            <div class="invalid-feedback">
                                Example invalid feedback text
                            </div>
                        </div>

                        <p class="mt-5">
                            <strong>Text Field Sizes</strong>
                        </p>

                        <div class="form-group">
                            <input
                                class="form-control form-control-lg"
                                type="text"
                                placeholder="Large"
                                aria-label="Text field large"
                            >
                        </div>
                        <div class="form-group">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Normal"
                                aria-label="Text field normal"
                            >
                        </div>
                        <div class="form-group">
                            <input
                                class="form-control form-control-sm"
                                type="text"
                                placeholder="Small"
                                aria-label="Text field small"
                            >
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <p><strong>Select</strong></p>

                        <div class="form-group">
                            <label for="select-default">Default</label>
                            <select id="select-default" class="form-control">
                                <option>Select value...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="select-disabled">Disabled</label>
                            <select id="select-disabled" class="form-control" disabled>
                                <option>Select value...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="select-success">Success</label>
                            <select id="select-success" class="form-control is-valid">
                                <option>Select value...</option>
                            </select>
                            <div class="valid-feedback">
                                Example invalid feedback text
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="select-error">Error</label>
                            <select id="select-error" class="form-control is-invalid">
                                <option>Select value...</option>
                            </select>
                            <div class="invalid-feedback">
                                Example invalid feedback text
                            </div>
                        </div>

                        <p class="mt-5">
                            <strong>Text Field Sizes</strong>
                        </p>

                        <div class="form-group">
                            <select class="form-control form-control-lg" aria-label="Text field large">
                                <option>Large...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" aria-label="Text field normal">
                                <option>Large...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control form-control-sm" aria-label="Text field small">
                                <option>Large...</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <p><strong>Textarea</strong></p>

                        <div class="form-group">
                            <label for="textarea-default">Default</label>
                            <textarea
                                id="textarea-default"
                                class="form-control"
                                placeholder="Placeholder"
                                :rows="3"
                            />
                        </div>
                        <div class="form-group">
                            <label for="textarea-readonly">Readonly</label>
                            <textarea
                                id="textarea-readonly"
                                class="form-control"
                                placeholder="Placeholder"
                                readOnly
                                :rows="3"
                            />
                        </div>
                        <div class="form-group">
                            <label for="textarea-disabled">Disabled</label>
                            <textarea
                                id="textarea-disabled"
                                class="form-control"
                                placeholder="Placeholder"
                                disabled
                                :rows="3"
                            />
                        </div>
                        <div class="form-group">
                            <label for="textarea-success">Success</label>
                            <textarea
                                id="textarea-success"
                                class="form-control is-valid"
                                placeholder="Placeholder"
                                :rows="3"
                            />
                        </div>
                        <div class="form-group">
                            <label for="textarea-error">Error</label>
                            <textarea
                                id="textarea-error"
                                class="form-control is-invalid"
                                placeholder="Placeholder"
                                :rows="3"
                            />
                        </div>

                        <p class="mt-5">
                            <strong>Textarea Sizes</strong>
                        </p>
                        <div class="form-group">
                            <textarea
                                class="form-control form-control-lg"
                                placeholder="Large"
                                aria-label="Text field large"
                                :rows="3"
                            />
                        </div>
                        <div class="form-group">
                            <textarea
                                class="form-control"
                                placeholder="Normal"
                                aria-label="Text field small"
                                :rows="3"
                            />
                        </div>
                        <div class="form-group">
                            <textarea
                                class="form-control form-control-sm"
                                placeholder="Small"
                                aria-label="Text field small"
                                :rows="3"
                            />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div v-for="buttonStyle in buttonStyles" :key="buttonStyle" class="col-lg-4">
                        <p><strong>{{ buttonStyleName(buttonStyle) }} Buttons</strong></p>

                        <div class="form-group">
                            <button type="button" :class="`btn btn-${buttonStyle} btn-xl`">
                                Extra Large
                            </button>
                            <button type="button" :class="`btn btn-${buttonStyle} btn-xl btn-svg-icon`">
                                <Quickview16Svg />
                            </button>
                        </div>
                        <div class="form-group">
                            <button type="button" :class="`btn btn-${buttonStyle} btn-lg`">
                                Button Large
                            </button>
                            <button type="button" :class="`btn btn-${buttonStyle} btn-lg btn-svg-icon`">
                                <Quickview16Svg />
                            </button>
                        </div>
                        <div class="form-group">
                            <button type="button" :class="`btn btn-${buttonStyle}`">
                                Button Normal
                            </button>
                            <button type="button" :class="`btn btn-${buttonStyle} btn-svg-icon`">
                                <Quickview16Svg />
                            </button>
                        </div>
                        <div class="form-group">
                            <button type="button" :class="`btn btn-${buttonStyle} btn-sm`">
                                Button Small
                            </button>
                            <button type="button" :class="`btn btn-${buttonStyle} btn-sm btn-svg-icon`">
                                <Quickview16Svg />
                            </button>
                        </div>
                        <div class="form-group">
                            <button type="button" :class="`btn btn-${buttonStyle} btn-xs`">
                                Extra Small
                            </button>
                            <button type="button" :class="`btn btn-${buttonStyle} btn-xs btn-svg-icon`">
                                <Quickview16Svg />
                            </button>
                        </div>

                        <p><strong>Loading State</strong></p>

                        <div class="form-group">
                            <button type="button" :class="`btn btn-${buttonStyle} btn-loading btn-xl`">
                                Extra Large
                            </button>
                            <button type="button" :class="`btn btn-${buttonStyle} btn-loading btn-xl btn-svg-icon`">
                                <Quickview16Svg />
                            </button>
                        </div>
                        <div class="form-group">
                            <button type="button" :class="`btn btn-${buttonStyle} btn-loading btn-lg`">
                                Button Large
                            </button>
                            <button type="button" :class="`btn btn-${buttonStyle} btn-loading btn-lg btn-svg-icon`">
                                <Quickview16Svg />
                            </button>
                        </div>
                        <div class="form-group">
                            <button type="button" :class="`btn btn-${buttonStyle} btn-loading`">
                                Button Normal
                            </button>
                            <button type="button" :class="`btn btn-${buttonStyle} btn-loading btn-svg-icon`">
                                <Quickview16Svg />
                            </button>
                        </div>
                        <div class="form-group">
                            <button type="button" :class="`btn btn-${buttonStyle} btn-loading btn-sm`">
                                Button Small
                            </button>
                            <button type="button" :class="`btn btn-${buttonStyle} btn-loading btn-sm btn-svg-icon`">
                                <Quickview16Svg />
                            </button>
                        </div>
                        <div class="form-group">
                            <button type="button" :class="`btn btn-${buttonStyle} btn-loading btn-xs`">
                                Extra Small
                            </button>
                            <button type="button" :class="`btn btn-${buttonStyle} btn-loading btn-xs btn-svg-icon`">
                                <Quickview16Svg />
                            </button>
                        </div>

                        <p><strong>Disabled State</strong></p>

                        <div class="form-group">
                            <button type="button" :class="`btn btn-${buttonStyle} btn-lg`" disabled>
                                Button Large
                            </button>
                            <button type="button" :class="`btn btn-${buttonStyle} btn-lg btn-svg-icon`" disabled>
                                <Quickview16Svg />
                            </button>
                        </div>
                        <div class="form-group">
                            <button type="button" :class="`btn btn-${buttonStyle}`" disabled>
                                Button Normal
                            </button>
                            <button type="button" :class="`btn btn-${buttonStyle} btn-svg-icon`" disabled>
                                <Quickview16Svg />
                            </button>
                        </div>
                        <div class="form-group">
                            <button type="button" :class="`btn btn-${buttonStyle} btn-sm`" disabled>
                                Button Small
                            </button>
                            <button type="button" :class="`btn btn-${buttonStyle} btn-sm btn-svg-icon`" disabled>
                                <Quickview16Svg />
                            </button>
                        </div>
                        <div class="form-group">
                            <button type="button" :class="`btn btn-${buttonStyle} btn-xs`" disabled>
                                Extra Small
                            </button>
                            <button type="button" :class="`btn btn-${buttonStyle} btn-xs btn-svg-icon`" disabled>
                                <Quickview16Svg />
                            </button>
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
import AppLink from '~/components/shared/app-link.vue'
import Cross12Svg from '~/svg/cross-12.svg'
import Quickview16Svg from '~/svg/quickview-16.svg'

@Component({
    components: { PageHeader, AppLink, Cross12Svg, Quickview16Svg },
    head () {
        return {
            title: 'Components'
        }
    }
})
export default class SitePageComponents extends Vue {
    buttonStyles = ['primary', 'secondary', 'light']

    buttonStyleName (buttonStyle: string) {
        return buttonStyle.charAt(0).toUpperCase() + buttonStyle.slice(1)
    }
}

</script>
