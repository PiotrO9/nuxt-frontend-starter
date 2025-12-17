<template>
    <header
        class="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur"
    >
        <div
            class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4"
        >
            <div class="flex items-center gap-3">
                <NuxtLink
                    to="/"
                    class="rounded-xl px-3 py-2 text-sm font-bold text-slate-900 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    aria-label="Go to home page"
                >
                    Frontend Starter
                </NuxtLink>
                <nav
                    class="hidden items-center gap-1 md:flex"
                    aria-label="Main navigation"
                >
                    <NuxtLink
                        v-for="link in navLinks"
                        :key="link.to"
                        :to="link.to"
                        class="rounded-xl px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        :class="linkClass(link.to)"
                        :aria-label="link.ariaLabel"
                    >
                        {{ link.label }}
                    </NuxtLink>
                </nav>
            </div>

            <div class="flex items-center gap-2">
                <Button
                    v-if="isAuthenticated"
                    variant="secondary"
                    aria-label="Log out"
                    @click="handleLogout"
                >
                    Log out
                </Button>
                <Button
                    v-else
                    variant="secondary"
                    aria-label="Go to login"
                    @click="handleGoToLogin"
                >
                    Log in
                </Button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
type NavLink = {
    to: string;
    label: string;
    ariaLabel: string;
};

const route = useRoute();
const { isAuthenticated, session, logout } = useAuthSession();
const { addToast } = useToast();

const navLinks = computed<NavLink[]>(() => [
    { to: '/', label: 'Home', ariaLabel: 'Go to Home' },
    {
        to: '/design-system',
        label: 'Design system',
        ariaLabel: 'Go to Design system page',
    },
    {
        to: '/api-demo',
        label: 'API Demo',
        ariaLabel: 'Go to API Demo page',
    },
    { to: '/protected', label: 'Protected', ariaLabel: 'Go to Protected page' },
]);

function linkClass(to: string): string {
    const isActive = route.path === to;

    if (isActive)
        return 'bg-slate-100 text-slate-900';

    return 'text-slate-700 hover:bg-slate-100 hover:text-slate-900';
}

function handleLogout() {
    const userName = session.value?.userName || 'User';

    logout();
    addToast({
        title: 'Logged out',
        description: `See you, ${userName}!`,
        variant: 'success',
    });
}

function handleGoToLogin() {
    navigateTo('/login');
}
</script>
