<template>
    <footer class="border-t border-slate-200 dark:border-slate-800">
        <div
            class="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between dark:text-slate-300"
        >
            <p class="font-medium text-slate-700 dark:text-slate-200">
                Nuxt 4 + Tailwind starter — example structure and patterns
            </p>
            <p class="text-slate-500 dark:text-slate-400">
                Last updated:
                <span class="text-slate-700 dark:text-slate-200">{{
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
