<template>
    <header
        class="sticky top-0 z-40 border-b border-secondary-200 bg-white/80 backdrop-blur dark:border-secondary-800 dark:bg-secondary-950/80"
    >
        <div
            class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4"
        >
            <div class="flex items-center gap-3">
                <NuxtLink
                    to="/"
                    class="rounded-xl px-3 py-2 text-sm font-bold text-secondary-900 transition hover:bg-secondary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-secondary-50 dark:hover:bg-secondary-800 dark:focus-visible:ring-offset-secondary-950"
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
                        class="rounded-xl px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-secondary-950"
                        :class="linkClass(link.to)"
                        :aria-label="link.ariaLabel"
                    >
                        {{ link.label }}
                    </NuxtLink>
                </nav>
            </div>

            <div class="flex items-center gap-2">
                <Switch
                    :checked="isDark"
                    :aria-label="switchAriaLabel"
                    left-icon="heroicons:sun"
                    right-icon="heroicons:moon"
                    left-icon-class="text-warning-500"
                    right-icon-class="text-secondary-600 dark:text-secondary-300"
                    @update:checked="handleToggleDarkMode"
                />
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
const { isDark, toggleDarkMode } = useDarkMode();

const switchAriaLabel = computed(() =>
    isDark.value ? 'Przełącz na tryb jasny' : 'Przełącz na tryb ciemny',
);

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
        return 'bg-secondary-100 text-secondary-900 dark:bg-secondary-800 dark:text-secondary-50';

    return 'text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-300 dark:hover:bg-secondary-800 dark:hover:text-secondary-50';
}

async function handleLogout() {
    const userName = session.value?.userName || 'User';

    await logout();
    addToast({
        title: 'Wylogowano',
        description: `Do zobaczenia, ${userName}!`,
        variant: 'success',
    });
}

function handleGoToLogin() {
    navigateTo('/login');
}

function handleToggleDarkMode() {
    toggleDarkMode();
}
</script>
