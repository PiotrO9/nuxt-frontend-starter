<template>
    <header
        class="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80"
    >
        <div
            class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4"
        >
            <div class="flex items-center gap-3">
                <NuxtLink
                    to="/"
                    class="rounded-xl px-3 py-2 text-sm font-bold text-slate-900 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-50 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
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
                        class="rounded-xl px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
                        :class="linkClass(link.to)"
                        :aria-label="link.ariaLabel"
                    >
                        {{ link.label }}
                    </NuxtLink>
                </nav>
            </div>

            <div class="flex items-center gap-2">
                <button
                    type="button"
                    class="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-slate-200 px-1 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-slate-700 dark:focus-visible:ring-offset-slate-950"
                    :aria-label="
                        isDark
                            ? 'Przełącz na tryb jasny'
                            : 'Przełącz na tryb ciemny'
                    "
                    tabindex="0"
                    @click="handleToggleDarkMode"
                    @keydown="handleToggleDarkModeKeyDown"
                >
                    <span
                        class="absolute flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 dark:translate-x-6"
                        aria-hidden="true"
                    >
                        <svg
                            v-if="isDark"
                            class="h-4 w-4 text-amber-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <svg
                            v-else
                            class="h-4 w-4 text-slate-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path
                                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                            />
                        </svg>
                    </span>
                </button>
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
        return 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50';

    return 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50';
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

function handleToggleDarkMode() {
    toggleDarkMode();
}

function handleToggleDarkModeKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleToggleDarkMode();
    }
}
</script>
