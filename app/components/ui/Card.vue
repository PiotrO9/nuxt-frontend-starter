<template>
    <section
        :aria-label="ariaLabel"
        class="rounded-2xl border border-secondary-200 bg-white p-5 dark:border-secondary-800 dark:bg-secondary-900"
    >
        <div v-if="$slots.header" class="mb-3">
            <slot name="header" />
        </div>
        <div class="text-secondary-700 dark:text-secondary-300">
            <slot />
        </div>
        <div
            v-if="$slots.footer"
            class="mt-4 border-t border-secondary-200 pt-4 dark:border-secondary-800"
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
