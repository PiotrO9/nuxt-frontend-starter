<script setup lang="ts">
import { useToast } from '~/composables/useToast';
import type { ToastVariant } from '~/composables/useToast';

const { toasts, removeToast } = useToast();

type ToastA11y = {
    role: 'status' | 'alert';
    ariaLive: 'polite' | 'assertive';
};

type ToastUi = {
    containerClass: string;
    iconWrapperClass: string;
    iconClass: string;
    closeRingClass: string;
    a11y: ToastA11y;
};

function getToastUi(variant: ToastVariant): ToastUi {
    if (variant === 'success') {
        return {
            containerClass:
                'border-emerald-600/60 bg-emerald-50/90 text-slate-900 dark:bg-emerald-950/40 dark:text-slate-50',
            iconWrapperClass:
                'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
            iconClass: 'text-emerald-700 dark:text-emerald-300',
            closeRingClass: 'focus-visible:ring-emerald-400',
            a11y: { role: 'status', ariaLive: 'polite' },
        };
    }

    if (variant === 'warning') {
        return {
            containerClass:
                'border-amber-600/60 bg-amber-50/90 text-slate-900 dark:bg-amber-950/40 dark:text-slate-50',
            iconWrapperClass:
                'bg-amber-500/15 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
            iconClass: 'text-amber-800 dark:text-amber-300',
            closeRingClass: 'focus-visible:ring-amber-400',
            a11y: { role: 'status', ariaLive: 'polite' },
        };
    }

    if (variant === 'error') {
        return {
            containerClass:
                'border-rose-600/60 bg-rose-50/90 text-slate-900 dark:bg-rose-950/40 dark:text-slate-50',
            iconWrapperClass:
                'bg-rose-500/15 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300',
            iconClass: 'text-rose-800 dark:text-rose-300',
            closeRingClass: 'focus-visible:ring-rose-400',
            a11y: { role: 'alert', ariaLive: 'assertive' },
        };
    }

    return {
        containerClass:
            'border-sky-600/60 bg-white/90 text-slate-900 dark:bg-slate-950/90 dark:text-slate-50',
        iconWrapperClass:
            'bg-sky-500/15 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300',
        iconClass: 'text-sky-800 dark:text-sky-300',
        closeRingClass: 'focus-visible:ring-sky-400',
        a11y: { role: 'status', ariaLive: 'polite' },
    };
}

function getToastIcon(variant: ToastVariant): string {
    if (variant === 'success') return '✓';
    if (variant === 'warning') return '!';
    if (variant === 'error') return '×';

    return 'i';
}

function handleClose(toastId: string) {
    removeToast(toastId);
}

function handleCloseKeyDown(event: KeyboardEvent, toastId: string) {
    if (!event) return;

    const isEnter = event.key === 'Enter';
    const isSpace = event.key === ' ';

    if (!isEnter && !isSpace) return;

    event.preventDefault();
    handleClose(toastId);
}
</script>

<template>
    <div
        class="pointer-events-none fixed top-4 right-4 z-50 w-full max-w-sm space-y-3"
        aria-label="Powiadomienia"
    >
        <TransitionGroup
            tag="div"
            class="space-y-3"
            move-class="transform-gpu transition duration-300 ease-out motion-reduce:transition-none"
            enter-active-class="will-change-transform transform-gpu transition duration-300 ease-out motion-reduce:transition-none"
            enter-from-class="opacity-0 translate-y-2 translate-x-6 scale-95"
            enter-to-class="opacity-100 translate-y-0 translate-x-0 scale-100"
            leave-active-class="will-change-transform transform-gpu transition duration-200 ease-in motion-reduce:transition-none"
            leave-from-class="opacity-100 translate-y-0 translate-x-0 scale-100"
            leave-to-class="opacity-0 translate-y-2 translate-x-6 scale-95"
        >
            <div
                v-for="toast in toasts"
                :key="toast.id"
                class="pointer-events-auto rounded-2xl border p-4 shadow-lg backdrop-blur"
                :class="getToastUi(toast.variant).containerClass"
                :role="getToastUi(toast.variant).a11y.role"
                :aria-live="getToastUi(toast.variant).a11y.ariaLive"
                aria-atomic="true"
            >
                <div class="flex items-start justify-between gap-3">
                    <div class="flex min-w-0 items-start gap-3">
                        <div
                            class="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                            :class="getToastUi(toast.variant).iconWrapperClass"
                            aria-hidden="true"
                        >
                            <span class="leading-none" aria-hidden="true">
                                {{ getToastIcon(toast.variant) }}
                            </span>
                        </div>

                        <div class="min-w-0">
                            <p class="truncate text-sm font-semibold">
                                {{ toast.title }}
                            </p>
                            <p
                                v-if="toast.description"
                                class="mt-1 text-sm text-slate-700 dark:text-slate-200"
                            >
                                {{ toast.description }}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        class="rounded-lg p-2 text-slate-700 transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-200 dark:hover:bg-white/10 dark:focus-visible:ring-offset-slate-950"
                        :class="getToastUi(toast.variant).closeRingClass"
                        aria-label="Zamknij powiadomienie"
                        @click="handleClose(toast.id)"
                        @keydown="handleCloseKeyDown($event, toast.id)"
                    >
                        <span aria-hidden="true" class="text-lg leading-none"
                            >×</span
                        >
                    </button>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped></style>
