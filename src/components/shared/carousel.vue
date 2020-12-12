<template>
    <div class="swiper-container" :dir="direction">
        <div class="swiper-wrapper">
            <slot />
        </div>
        <div class="swiper-pagination" />
    </div>
</template>

<script lang="ts" src="./carousel.ts" />
