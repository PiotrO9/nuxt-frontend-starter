<template>
    <button
        :type="buttonType"
        :disabled="isDisabled"
        :aria-label="ariaLabel"
        :class="buttonClass"
        @click="handleClick"
    >
        <span v-if="isLoading" class="inline-flex items-center gap-2">
            <span
                class="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
                aria-hidden="true"
            />
            <span class="text-sm font-medium">Loading…</span>
        </span>
        <span v-else class="inline-flex items-center gap-2">
            <slot />
        </span>
    </button>
</template>

<script setup lang="ts">
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type Props = {
    ariaLabel?: string;
    variant?: ButtonVariant;
    buttonType?: 'button' | 'submit' | 'reset';
    isLoading?: boolean;
    isDisabled?: boolean;
};

type Emits = {
    (e: 'click', event: MouseEvent): void;
};

const props = withDefaults(defineProps<Props>(), {
    ariaLabel: 'Przycisk',
    variant: 'primary',
    buttonType: 'button',
    isLoading: false,
    isDisabled: false,
});

const emit = defineEmits<Emits>();

const isDisabled = computed(() => props.isDisabled || props.isLoading);

const buttonClass = computed(() => {
    const base =
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60';

    if (props.variant === 'secondary') {
        return `${base} bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700`;
    }

    if (props.variant === 'ghost') {
        return `${base} bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800`;
    }

    if (props.variant === 'danger') {
        return `${base} bg-rose-600 text-white hover:bg-rose-500 dark:bg-rose-700 dark:hover:bg-rose-600`;
    }

    return `${base} bg-sky-500 text-slate-950 hover:bg-sky-400 dark:bg-sky-600 dark:text-white dark:hover:bg-sky-500`;
});

function handleClick(event: MouseEvent) {
    if (isDisabled.value) return;
    emit('click', event);
}
</script>
