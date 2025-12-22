<script setup lang="ts">
import type { ToastVariant } from '~/composables/useToast';
import { isEnterOrSpaceKey } from '~/utils/keyboard';

interface ColorSwatch {
    name: string;
    className: string;
    previewClass: string;
}

interface ColorGroup {
    name: string;
    swatches: ColorSwatch[];
}

useHead({
    title: 'Design system',
});

const { addToast } = useToast();

const isDialogOpen = ref(false);

const colorGroups = computed<ColorGroup[]>(() => [
    {
        name: 'Slate',
        swatches: [
            {
                name: 'Background',
                className: 'bg-slate-950',
                previewClass: 'bg-slate-950',
            },
            {
                name: 'Surface',
                className: 'bg-slate-900',
                previewClass: 'bg-slate-900',
            },
            {
                name: 'Border',
                className: 'border-slate-800',
                previewClass: 'bg-slate-950 ring-1 ring-slate-800',
            },
            {
                name: 'Text',
                className: 'text-slate-50',
                previewClass: 'bg-slate-50',
            },
        ],
    },
    {
        name: 'Brand',
        swatches: [
            {
                name: 'Primary',
                className: 'bg-sky-500',
                previewClass: 'bg-sky-500',
            },
            {
                name: 'Primary hover',
                className: 'bg-sky-400',
                previewClass: 'bg-sky-400',
            },
            {
                name: 'Ring',
                className: 'ring-sky-400',
                previewClass: 'bg-slate-950 ring-2 ring-sky-400',
            },
            {
                name: 'Link',
                className: 'text-sky-300',
                previewClass: 'bg-sky-300',
            },
        ],
    },
    {
        name: 'Success',
        swatches: [
            {
                name: 'Border',
                className: 'border-emerald-600/60',
                previewClass: 'bg-emerald-500/80',
            },
            {
                name: 'Text',
                className: 'text-emerald-300',
                previewClass: 'bg-emerald-300',
            },
            {
                name: 'Surface',
                className: 'bg-emerald-950/40',
                previewClass: 'bg-emerald-950/60',
            },
            {
                name: 'Solid',
                className: 'bg-emerald-500',
                previewClass: 'bg-emerald-500',
            },
        ],
    },
    {
        name: 'Warning',
        swatches: [
            {
                name: 'Border',
                className: 'border-amber-600/60',
                previewClass: 'bg-amber-500/80',
            },
            {
                name: 'Text',
                className: 'text-amber-300',
                previewClass: 'bg-amber-300',
            },
            {
                name: 'Surface',
                className: 'bg-amber-950/40',
                previewClass: 'bg-amber-950/60',
            },
            {
                name: 'Solid',
                className: 'bg-amber-500',
                previewClass: 'bg-amber-500',
            },
        ],
    },
    {
        name: 'Danger',
        swatches: [
            {
                name: 'Border',
                className: 'border-rose-600/60',
                previewClass: 'bg-rose-500/80',
            },
            {
                name: 'Text',
                className: 'text-rose-300',
                previewClass: 'bg-rose-300',
            },
            {
                name: 'Surface',
                className: 'bg-rose-950/40',
                previewClass: 'bg-rose-950/60',
            },
            {
                name: 'Solid',
                className: 'bg-rose-600',
                previewClass: 'bg-rose-600',
            },
        ],
    },
]);

async function copyTextToClipboard(text: string): Promise<boolean> {
    if (!text) return false;

    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);

            return true;
        }
    } catch {
        // fallback below
    }

    try {
        const textarea = document.createElement('textarea');

        textarea.value = text;
        textarea.setAttribute('readonly', 'true');
        textarea.className = 'fixed left-0 top-0 opacity-0 pointer-events-none';
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        const isCopied = document.execCommand('copy');

        document.body.removeChild(textarea);

        return isCopied;
    } catch {
        return false;
    }
}

async function handleCopySwatch(group: ColorGroup, swatch: ColorSwatch) {
    const text = swatch.className;

    const isCopied = await copyTextToClipboard(text);

    if (!isCopied) {
        addToast({
            title: 'Copy failed',
            description: `Could not copy ${group.name} ${swatch.name}.`,
            variant: 'error',
        });

        return;
    }

    addToast({
        title: 'Copied',
        description: `${swatch.name}: ${swatch.className}`,
        variant: 'success',
    });
}

function handleKeyDownCopySwatch(
    event: KeyboardEvent,
    group: ColorGroup,
    swatch: ColorSwatch,
) {
    if (!isEnterOrSpaceKey(event)) return;

    event.preventDefault();
    void handleCopySwatch(group, swatch);
}

function handleToast(variant: ToastVariant) {
    const title =
        variant === 'success'
            ? 'Success'
            : variant === 'warning'
              ? 'Warning'
              : variant === 'error'
                ? 'Error'
                : 'Info';

    addToast({
        title,
        description: 'This is a sample toast.',
        variant,
    });
}

function handleOpenDialog() {
    isDialogOpen.value = true;
}

function handleDialogConfirm() {
    addToast({
        title: 'Confirmed',
        description: 'You confirmed the dialog action.',
        variant: 'success',
    });
}

function handleDialogCancel() {
    addToast({
        title: 'Cancelled',
        description: 'You cancelled the dialog.',
        variant: 'info',
    });
}
</script>

<template>
    <div class="space-y-8">
        <section class="space-y-2">
            <h1 class="text-3xl font-extrabold tracking-tight">
                Design system
            </h1>
            <p class="max-w-3xl text-slate-700 dark:text-slate-300">
                A single place to preview the Tailwind palette and the UI
                building blocks used in this starter.
            </p>
        </section>

        <section aria-label="Colors" class="space-y-4">
            <div
                class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between"
            >
                <div class="space-y-1">
                    <h2 class="text-xl font-bold tracking-tight">Colors</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        These are example tokens based on Tailwind utility
                        classes.
                    </p>
                </div>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
                <Card
                    v-for="group in colorGroups"
                    :key="group.name"
                    :aria-label="`Color group: ${group.name}`"
                >
                    <template #header>
                        <div class="flex items-center justify-between gap-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                {{ group.name }}
                            </p>
                        </div>
                    </template>

                    <div class="grid gap-3 sm:grid-cols-2">
                        <button
                            v-for="swatch in group.swatches"
                            :key="swatch.name"
                            type="button"
                            tabindex="0"
                            class="group flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white/70 p-3 text-left transition hover:border-slate-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-800 dark:bg-slate-800/70 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
                            :aria-label="`Copy ${group.name} ${swatch.name}: ${swatch.className}`"
                            @click="handleCopySwatch(group, swatch)"
                            @keydown="
                                handleKeyDownCopySwatch($event, group, swatch)
                            "
                        >
                            <div class="flex min-w-0 items-center gap-3">
                                <div
                                    class="h-10 w-10 flex-none rounded-xl border border-slate-200 dark:border-slate-700"
                                    :class="swatch.previewClass"
                                    :aria-label="`Color preview ${swatch.name}`"
                                    role="img"
                                />
                                <div class="min-w-0">
                                    <p
                                        class="truncate text-sm font-semibold text-slate-900 dark:text-slate-50"
                                    >
                                        {{ swatch.name }}
                                    </p>
                                    <p
                                        class="truncate font-mono text-xs text-slate-600 dark:text-slate-400"
                                    >
                                        {{ swatch.className }}
                                    </p>
                                </div>
                            </div>
                        </button>
                    </div>
                </Card>
            </div>
        </section>

        <section aria-label="Components" class="space-y-4">
            <h2 class="text-xl font-bold tracking-tight">Components</h2>

            <div class="grid gap-4 lg:grid-cols-2">
                <Card aria-label="Card: Actions">
                    <template #header>
                        <p
                            class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                        >
                            Actions
                        </p>
                    </template>

                    <div class="space-y-6">
                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Primary
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <Action aria-label="Primary normal"
                                    >Normal</Action
                                >
                                <Action
                                    aria-label="Primary loading"
                                    :is-loading="true"
                                >
                                    Submit
                                </Action>
                                <Action
                                    aria-label="Primary disabled"
                                    :is-disabled="true"
                                >
                                    Disabled
                                </Action>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Secondary
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <Action
                                    aria-label="Secondary normal"
                                    variant="secondary"
                                >
                                    Normal
                                </Action>
                                <Action
                                    aria-label="Secondary loading"
                                    variant="secondary"
                                    :is-loading="true"
                                >
                                    Save
                                </Action>
                                <Action
                                    aria-label="Secondary disabled"
                                    variant="secondary"
                                    :is-disabled="true"
                                >
                                    Disabled
                                </Action>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Circle
                            </p>
                            <div class="flex flex-wrap items-center gap-3">
                                <Action
                                    aria-label="Circle primary"
                                    :circle="true"
                                >
                                    <Icon
                                        name="heroicons:plus"
                                        class="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </Action>
                                <Action
                                    aria-label="Circle secondary"
                                    variant="secondary"
                                    :circle="true"
                                >
                                    <Icon
                                        name="heroicons:plus"
                                        class="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </Action>
                                <Action
                                    aria-label="Circle loading"
                                    :circle="true"
                                    :is-loading="true"
                                >
                                    <Icon
                                        name="heroicons:plus"
                                        class="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </Action>
                                <Action
                                    aria-label="Circle disabled"
                                    :circle="true"
                                    :is-disabled="true"
                                >
                                    <Icon
                                        name="heroicons:plus"
                                        class="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </Action>
                                <Action
                                    aria-label="Circle z tekstem"
                                    :circle="true"
                                >
                                    A
                                </Action>
                                <Action
                                    aria-label="Circle z emoji"
                                    variant="secondary"
                                    :circle="true"
                                >
                                    ❤️
                                </Action>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Różne tagi
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <Action
                                    aria-label="Action jako button"
                                    tag="button"
                                >
                                    Button
                                </Action>
                                <Action
                                    aria-label="Action jako link"
                                    tag="a"
                                    href="#"
                                    variant="secondary"
                                >
                                    Link
                                </Action>
                                <Action
                                    aria-label="Action jako div"
                                    tag="div"
                                    variant="secondary"
                                >
                                    Div
                                </Action>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card aria-label="Card: Toasts">
                    <template #header>
                        <p
                            class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                        >
                            Toasts
                        </p>
                    </template>

                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Toasts render in the top-right via
                        <code
                            class="font-mono text-slate-900 dark:text-slate-50"
                            >ToastStack</code
                        >.
                    </p>

                    <div class="mt-4 flex flex-wrap gap-2">
                        <Action
                            aria-label="Show success toast"
                            @click="handleToast('success')"
                        >
                            Success
                        </Action>
                        <Action
                            aria-label="Show info toast"
                            variant="secondary"
                            @click="handleToast('info')"
                        >
                            Info
                        </Action>
                        <Action
                            aria-label="Show warning toast"
                            variant="secondary"
                            @click="handleToast('warning')"
                        >
                            Warning
                        </Action>
                        <Action
                            aria-label="Show error toast"
                            variant="secondary"
                            @click="handleToast('error')"
                        >
                            Error
                        </Action>
                    </div>
                </Card>

                <Card aria-label="Card: Dialog">
                    <template #header>
                        <p
                            class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                        >
                            Dialog
                        </p>
                    </template>

                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Demo of
                        <code
                            class="font-mono text-slate-900 dark:text-slate-50"
                            >Dialog</code
                        >
                        (native
                        <code
                            class="font-mono text-slate-900 dark:text-slate-50"
                            >&lt;dialog&gt;</code
                        >
                        + Teleport).
                    </p>

                    <div class="mt-4 flex flex-wrap gap-2">
                        <Action
                            aria-label="Open dialog"
                            @click="handleOpenDialog"
                        >
                            Open dialog
                        </Action>
                    </div>
                </Card>

                <Card aria-label="Card: Cards">
                    <template #header>
                        <p
                            class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                        >
                            Cards
                        </p>
                    </template>

                    <Card aria-label="Nested card preview">
                        <template #header>
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Nested example
                            </p>
                        </template>
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Cards are great for grouping content and actions.
                        </p>
                        <template #footer>
                            <div class="flex flex-wrap gap-2">
                                <Action
                                    aria-label="Card primary action"
                                    @click="handleToast('info')"
                                >
                                    Action
                                </Action>
                                <Action
                                    aria-label="Card secondary action"
                                    variant="secondary"
                                    @click="handleToast('success')"
                                >
                                    Secondary
                                </Action>
                            </div>
                        </template>
                    </Card>
                </Card>

                <Card aria-label="Card: Badge">
                    <template #header>
                        <p
                            class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                        >
                            Badge
                        </p>
                    </template>

                    <div class="space-y-6">
                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Warianty
                            </p>
                            <div class="flex flex-wrap items-center gap-3">
                                <Badge variant="primary">Primary</Badge>
                                <Badge variant="secondary">Secondary</Badge>
                                <Badge variant="success">Success</Badge>
                                <Badge variant="warning">Warning</Badge>
                                <Badge variant="danger">Danger</Badge>
                                <Badge variant="info">Info</Badge>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Rozmiary
                            </p>
                            <div class="flex flex-wrap items-center gap-3">
                                <Badge size="sm" variant="primary">Mały</Badge>
                                <Badge size="md" variant="primary"
                                    >Średni</Badge
                                >
                                <Badge size="lg" variant="primary">Duży</Badge>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card aria-label="Card: Skeleton">
                    <template #header>
                        <p
                            class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                        >
                            Skeleton
                        </p>
                    </template>

                    <div class="space-y-6">
                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Warianty
                            </p>
                            <div class="space-y-2">
                                <Skeleton variant="pulse" />
                                <Skeleton variant="wave" />
                                <Skeleton variant="default" />
                            </div>
                        </div>

                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Różne kształty
                            </p>
                            <div class="space-y-2">
                                <Skeleton
                                    rounded="none"
                                    width="100%"
                                    height="1rem"
                                />
                                <Skeleton
                                    rounded="sm"
                                    width="80%"
                                    height="1rem"
                                />
                                <Skeleton
                                    rounded="md"
                                    width="60%"
                                    height="1rem"
                                />
                                <Skeleton
                                    rounded="lg"
                                    width="40%"
                                    height="1rem"
                                />
                                <Skeleton
                                    rounded="full"
                                    width="2rem"
                                    height="2rem"
                                />
                            </div>
                        </div>

                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Przykład karty
                            </p>
                            <div
                                class="space-y-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div class="flex items-center gap-3">
                                    <Skeleton
                                        rounded="full"
                                        width="3rem"
                                        height="3rem"
                                    />
                                    <div class="flex-1 space-y-2">
                                        <Skeleton width="60%" height="1rem" />
                                        <Skeleton
                                            width="40%"
                                            height="0.875rem"
                                        />
                                    </div>
                                </div>
                                <Skeleton width="100%" height="1rem" />
                                <Skeleton width="90%" height="1rem" />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card aria-label="Card: Spinner">
                    <template #header>
                        <p
                            class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                        >
                            Spinner
                        </p>
                    </template>

                    <div class="space-y-6">
                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Rozmiary
                            </p>
                            <div class="flex flex-wrap items-center gap-6">
                                <div class="flex flex-col items-center gap-2">
                                    <Spinner size="sm" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Mały</span
                                    >
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <Spinner size="md" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Średni</span
                                    >
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <Spinner size="lg" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Duży</span
                                    >
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <Spinner size="xl" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Bardzo duży</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Warianty
                            </p>
                            <div class="flex flex-wrap items-center gap-6">
                                <div class="flex flex-col items-center gap-2">
                                    <Spinner variant="primary" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Primary</span
                                    >
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <Spinner variant="secondary" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Secondary</span
                                    >
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <div
                                        class="rounded-lg bg-slate-900 p-3 dark:bg-slate-50"
                                    >
                                        <Spinner variant="white" />
                                    </div>
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >White</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card aria-label="Card: Loader">
                    <template #header>
                        <p
                            class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                        >
                            Loader
                        </p>
                    </template>

                    <div class="space-y-6">
                        <p class="text-sm text-slate-600 dark:text-slate-400">
                            Zaawansowany loader z animacjami SVG, idealny do
                            wyświetlania podczas ładowania modułów lub większych
                            sekcji aplikacji.
                        </p>

                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Warianty animacji
                            </p>
                            <div class="grid grid-cols-2 gap-6 md:grid-cols-3">
                                <div class="flex flex-col items-center gap-2">
                                    <Loader variant="circles" size="md" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Circles</span
                                    >
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <Loader variant="pulse" size="md" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Pulse</span
                                    >
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <Loader variant="dots" size="md" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Dots</span
                                    >
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <Loader variant="wave" size="md" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Wave</span
                                    >
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <Loader variant="orbit" size="md" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Orbit</span
                                    >
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <Loader variant="spinner" size="md" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Spinner</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Rozmiary
                            </p>
                            <div class="flex flex-wrap items-center gap-6">
                                <div class="flex flex-col items-center gap-2">
                                    <Loader variant="circles" size="sm" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Mały</span
                                    >
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <Loader variant="circles" size="md" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Średni</span
                                    >
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <Loader variant="circles" size="lg" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Duży</span
                                    >
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <Loader variant="circles" size="xl" />
                                    <span
                                        class="text-xs text-slate-600 dark:text-slate-400"
                                        >Bardzo duży</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Z tekstem
                            </p>
                            <div class="flex flex-col items-center gap-4">
                                <Loader
                                    variant="circles"
                                    size="lg"
                                    text="Ładowanie danych..."
                                />
                                <Loader
                                    variant="pulse"
                                    size="md"
                                    text="Proszę czekać..."
                                />
                            </div>
                        </div>

                        <div class="space-y-3">
                            <p
                                class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                            >
                                Przykład użycia w sekcji
                            </p>
                            <div
                                class="relative min-h-[200px] rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                            >
                                <Loader
                                    variant="orbit"
                                    size="lg"
                                    text="Ładowanie modułu..."
                                    :centered="true"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>

        <Dialog
            v-model:open="isDialogOpen"
            cancel-text="Cancel"
            confirm-text="Confirm"
            message="This is a demo dialog. Press Escape or click outside to close."
            title="Confirm action"
            @cancel="handleDialogCancel"
            @confirm="handleDialogConfirm"
        />
    </div>
</template>
