<template>
    <footer class="border-t border-secondary-200 dark:border-secondary-800">
        <div
            class="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-secondary-600 md:flex-row md:items-center md:justify-between dark:text-secondary-400"
        >
            <p class="font-medium text-secondary-700 dark:text-secondary-300">
                Nuxt 4 + Tailwind starter — example structure and patterns
            </p>
            <p class="text-secondary-500 dark:text-secondary-400">
                Last updated:
                <span class="text-secondary-700 dark:text-secondary-300">{{
                    formattedNow
                }}</span>
            </p>
        </div>
    </footer>
</template>

<script setup lang="ts">
const now = new Date();
const formattedNow = computed(() => formatDate(now, 'long'));
</script>
