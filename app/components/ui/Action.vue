<template>
    <component
        :is="tag"
        :type="tag === 'button' ? buttonType : undefined"
        :disabled="isDisabled && tag === 'button'"
        :href="tag === 'a' ? href : undefined"
        :aria-label
        :aria-disabled="isDisabled"
        :tabindex="isDisabled ? -1 : 0"
        :class="[actionClass, loadingClasses]"
        @click="handleClick"
        @keydown="handleKeyDown"
    >
        <div
            :class="{
                'opacity-0': isLoading && circle,
                'opacity-50': isLoading && !circle,
            }"
        >
            <slot />
        </div>
        <div
            v-if="isLoading"
            class="absolute inset-0 z-10 flex cursor-wait items-center justify-center gap-2"
            aria-hidden="true"
            @click.stop
            @mousedown.stop
            @mouseup.stop
        >
            <span
                class="size-4 animate-spin cursor-wait rounded-full border-2 border-current border-r-transparent"
            />
        </div>
    </component>
</template>

<script setup lang="ts">
export type ActionVariant = 'primary' | 'secondary';

type Props = {
    tag?: string;
    ariaLabel?: string;
    variant?: ActionVariant;
    buttonType?: 'button' | 'submit' | 'reset';
    isLoading?: boolean;
    isDisabled?: boolean;
    href?: string;
    circle?: boolean;
};

type Emits = {
    (e: 'click', event: MouseEvent): void;
};

const props = withDefaults(defineProps<Props>(), {
    tag: 'button',
    ariaLabel: 'Akcja',
    variant: 'primary',
    buttonType: 'button',
    isLoading: false,
    isDisabled: false,
    href: undefined,
    circle: false,
});

const emit = defineEmits<Emits>();

const isDisabled = computed(() => props.isDisabled || props.isLoading);

const baseClasses =
    'inline-flex items-center justify-center text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed';

const shapeClasses = computed(() =>
    props.circle ? 'rounded-full w-10 h-10 p-0' : 'rounded-xl px-4 py-2',
);

const stateClasses = computed(() => {
    if (props.isLoading) {
        const loadingBase =
            'cursor-wait border border-slate-200 dark:border-slate-700';

        if (props.variant === 'secondary') {
            return `${loadingBase} bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50`;
        }

        return `${loadingBase} bg-sky-100 text-sky-600 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800`;
    }

    if (props.isDisabled) {
        return 'cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700';
    }

    if (props.variant === 'secondary') {
        return 'cursor-pointer bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700';
    }

    return 'cursor-pointer bg-sky-500 text-slate-950 hover:bg-sky-400 dark:bg-sky-600 dark:text-white dark:hover:bg-sky-500';
});

const actionClass = computed(
    () => `${baseClasses} ${shapeClasses.value} ${stateClasses.value}`,
);

const loadingClasses = computed(() => ({
    relative: props.isLoading,
    'pointer-events-none overflow-hidden cursor-wait': props.isLoading,
}));

function handleClick(event: MouseEvent) {
    if (isDisabled.value) {
        event.preventDefault();

        return;
    }

    emit('click', event);
}

function handleKeyDown(event: KeyboardEvent) {
    if (isDisabled.value) return;

    if (isEnterOrSpaceKey(event)) {
        event.preventDefault();
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        });

        emit('click', clickEvent);
    }
}
</script>
