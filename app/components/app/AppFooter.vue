<template>
    <footer class="border-t border-slate-200">
        <div
            class="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between"
        >
            <p class="font-medium text-slate-700">
                Nuxt 4 + Tailwind starter — example structure and patterns
            </p>
            <p class="text-slate-500">
                Last updated:
                <span class="text-slate-700">{{
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
