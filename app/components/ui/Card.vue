<template>
    <section
        :aria-label="ariaLabel"
        class="rounded-2xl border border-slate-200 bg-white p-5"
    >
        <div v-if="$slots.header" class="mb-3">
            <slot name="header" />
        </div>
        <div class="text-slate-700">
            <slot />
        </div>
        <div
            v-if="$slots.footer"
            class="mt-4 border-t border-slate-200 pt-4"
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
