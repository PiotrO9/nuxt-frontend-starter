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
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-secondary-950 disabled:cursor-not-allowed disabled:opacity-60';

    if (props.variant === 'secondary') {
        return `${base} bg-secondary-100 text-secondary-900 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-50 dark:hover:bg-secondary-700`;
    }

    if (props.variant === 'ghost') {
        return `${base} bg-transparent text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800`;
    }

    if (props.variant === 'danger') {
        return `${base} bg-danger-600 text-white hover:bg-danger-500 dark:bg-danger-700 dark:hover:bg-danger-600`;
    }

    return `${base} bg-primary-500 text-secondary-950 hover:bg-primary-400 dark:bg-primary-600 dark:text-white dark:hover:bg-primary-500`;
});

function handleClick(event: MouseEvent) {
    if (isDisabled.value) return;

    emit('click', event);
}
</script>

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
