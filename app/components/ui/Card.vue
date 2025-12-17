<template>
    <section
        :aria-label="ariaLabel"
        class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60"
    >
        <div v-if="$slots.header" class="mb-3">
            <slot name="header" />
        </div>
        <div class="text-slate-700 dark:text-slate-200">
            <slot />
        </div>
        <div
            v-if="$slots.footer"
            class="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800"
        >
            <slot name="footer" />
        </div>
    </section>
</template>

<script setup lang="ts">
type Props = {
    ariaLabel?: string;
};

withDefaults(defineProps<Props>(), {
    ariaLabel: 'Karta',
});
</script>
