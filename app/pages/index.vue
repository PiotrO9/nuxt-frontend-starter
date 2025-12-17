<template>
    <div class="space-y-8">
        <section
            class="rounded-3xl border border-slate-200 bg-linear-to-br from-white to-slate-50 p-8"
        >
            <h1
                class="text-3xl font-extrabold tracking-tight text-balance md:text-4xl"
            >
                Frontend Starter (Nuxt 4 + Vue 3 + TS + Tailwind)
            </h1>
            <p
                class="mt-3 max-w-2xl text-pretty text-slate-700"
            >
                This is an example skeleton: layout, routing, "auth" middleware,
                composables, and a few UI components. You can use it as a base
                for a real project.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
                <Button
                    variant="secondary"
                    aria-label="Go to protected page"
                    @click="handleGoToProtected"
                >
                    Go to protected
                </Button>
            </div>
        </section>

        <section class="grid gap-4 md:grid-cols-3">
            <Card aria-label="Card: Auth middleware">
                <template #header>
                    <p
                        class="text-sm font-semibold text-slate-900"
                    >
                        "auth" middleware
                    </p>
                </template>
                <p class="text-sm text-slate-600">
                    Simple mechanism: cookie -&gt; if missing, redirect to
                    `/login` with a `redirect` query.
                </p>
                <template #footer>
                    <NuxtLink
                        to="/protected"
                        class="inline-flex rounded-xl px-3 py-2 text-sm font-semibold text-sky-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        aria-label="Go to Protected page"
                    >
                        Check protected -&gt;
                    </NuxtLink>
                </template>
            </Card>

            <Card aria-label="Card: Composables">
                <template #header>
                    <p
                        class="text-sm font-semibold text-slate-900"
                    >
                        Composables
                    </p>
                </template>
                <p class="text-sm text-slate-600">
                    `useAuthSession`, `useToast` - simple, readable, and ready
                    to extend.
                </p>
                <template #footer>
                    <NuxtLink
                        to="/login"
                        class="inline-flex rounded-xl px-3 py-2 text-sm font-semibold text-sky-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        aria-label="Go to Login page"
                    >
                        Open login -&gt;
                    </NuxtLink>
                </template>
            </Card>
        </section>
    </div>
</template>

<script setup lang="ts">
const { addToast } = useToast();

function handleGoToProtected() {
    addToast({
        title: 'Navigation',
        description: 'Going to protected...',
        variant: 'info',
    });
    navigateTo('/protected');
}
</script>
