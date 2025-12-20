<template>
    <span :aria-label="ariaLabel" :class="badgeClass" role="status">
        <slot />
    </span>
</template>

<script setup lang="ts">
export type BadgeVariant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info';

type Props = {
    ariaLabel?: string;
    variant?: BadgeVariant;
    size?: 'sm' | 'md' | 'lg';
};

const props = withDefaults(defineProps<Props>(), {
    ariaLabel: 'Znacznik',
    variant: 'primary',
    size: 'md',
});

const badgeClass = computed(() => {
    const base =
        'inline-flex items-center font-semibold rounded-full transition-colors';

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };

    const variantClasses = {
        primary: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300',
        secondary:
            'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
        success:
            'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
        warning:
            'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
        danger: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    };

    return `${base} ${sizeClasses[props.size]} ${variantClasses[props.variant]}`;
});
</script>
