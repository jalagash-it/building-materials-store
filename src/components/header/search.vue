<template>
    <div
        :class="[
            'search',
            `search--location--${location}`,
            {
                'search--has-suggestions': hasSuggestions,
                'search--suggestions-open': suggestionsOpen
            }
        ]"
    >
        <div class="search__body">
            <form class="search__form">
                <select
                    v-if="location === 'header'"
                    class="search__categories"
                    aria-label="Category"
                    @change="onCategoryChange"
                    @focus="onCategoryFocus"
                >
                    <option value="">
                        All Categories
                    </option>
                    <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.slug"
                    >
                        {{ String.fromCharCode(160).repeat(category.depth * 4) + category.name }}
                    </option>
                </select>
                <input
                    ref="input"
                    class="search__input"
                    name="search"
                    placeholder="Search over 10,000 products"
                    aria-label="Site search"
                    type="text"
                    autocomplete="off"
                    :value="query"
                    @input="onQueryInput"
                    @focus="onQueryFocus"
                    @keydown.esc="onQueryEscape"
                >
                <button class="search__button search__button--type--submit" type="submit">
                    <Search20Svg />
                </button>
                <button
                    v-if="location === 'mobile-header'"
                    class="search__button search__button--type--close"
                    type="button"
                    @click="onCloseClick"
                >
                    <Cross20Svg />
                </button>
                <div class="search__border" />
            </form>

            <div
                :class="[
                    'search__suggestions',
                    'suggestions',
                    `suggestions--location--${location}`
                ]"
            >
                <ul class="suggestions__list">
                    <li v-for="product in suggestedProducts" :key="product.id" class="suggestions__item">
                        <div class="suggestions__item-image product-image">
                            <div class="product-image__body">
                                <!--suppress HtmlUnknownTarget -->
                                <img class="product-image__img" :src="$url.img(product.images[0])" alt="">
                            </div>
                        </div>

                        <div class="suggestions__item-info">
                            <NuxtLink :to="$url.product(product)" class="suggestions__item-name" @click.native="closeSuggestion()">
                                {{ product.name }}
                            </NuxtLink>
                            <div class="suggestions__item-meta">
                                SKU: {{ product.sku }}
                            </div>
                        </div>
                        <div class="suggestions__item-price">
                            {{ $price(product.price) }}
                        </div>

                        <div v-if="location === 'header'" class="suggestions__item-actions">
                            <AsyncAction v-slot:default="{ run, isLoading }" :action="() => $store.dispatch('cart/add', { product })">
                                <button
                                    type="button"
                                    title="Add to cart"
                                    :class="[
                                        'btn btn-primary btn-sm btn-svg-icon',
                                        {'btn-loading': isLoading}
                                    ]"
                                    @click="run"
                                >
                                    <Cart16Svg />
                                </button>
                            </AsyncAction>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./search.ts" />
