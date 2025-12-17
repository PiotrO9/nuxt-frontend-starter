<template>
    <div class="mx-auto w-full max-w-xl space-y-6">
        <div class="space-y-2">
            <h1 class="text-2xl font-extrabold tracking-tight">Login (demo)</h1>
            <p class="text-slate-700 dark:text-slate-300">
                This is intentionally simple: save to a cookie + redirect to the
                protected page.
            </p>
        </div>

        <Card aria-label="Card: Demo login">
            <template #header>
                <p
                    class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                >
                    Session
                </p>
            </template>

            <div class="space-y-4">
                <p class="text-sm text-slate-600 dark:text-slate-400">
                    Status:
                    <span
                        class="font-semibold text-slate-900 dark:text-slate-50"
                    >
                        {{
                            isAuthenticated
                                ? `signed in as ${session?.userName}`
                                : 'signed out'
                        }}
                    </span>
                </p>

                <div class="space-y-2">
                    <label
                        class="block text-sm font-medium text-slate-700 dark:text-slate-300"
                        for="userNameInput"
                        >Name</label
                    >
                    <input
                        id="userNameInput"
                        v-model="userName"
                        type="text"
                        class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus-visible:ring-offset-slate-950"
                        placeholder="e.g. Jane"
                        aria-label="Enter user name"
                        @keydown.enter="handleLogin"
                    />
                </div>

                <div class="flex flex-wrap gap-2">
                    <Button
                        v-if="!isAuthenticated"
                        aria-label="Log in (demo)"
                        :is-disabled="!userNameTrimmed"
                        @click="handleLogin"
                    >
                        Log in
                    </Button>
                    <Button
                        v-else
                        variant="secondary"
                        aria-label="Log out (demo)"
                        @click="handleLogout"
                    >
                        Log out
                    </Button>

                    <Button
                        variant="ghost"
                        aria-label="Go back home"
                        @click="handleGoHome"
                    >
                        Home
                    </Button>
                </div>
            </div>
        </Card>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { addToast } = useToast();
const { isAuthenticated, session, loginDemo, logout } = useAuthSession();

const userName = ref('Jan');
const userNameTrimmed = computed(() => userName.value.trim());

function resolveRedirectTarget(): string {
    const redirectQuery = route.query.redirect;

    if (!redirectQuery) return '/protected';
    if (Array.isArray(redirectQuery)) return redirectQuery[0] || '/protected';

    return redirectQuery;
}

function handleLogin() {
    if (isAuthenticated.value) {
        addToast({
            title: 'Already signed in',
            description: 'You can continue.',
            variant: 'info',
        });
        navigateTo(resolveRedirectTarget());

        return;
    }

    if (!userNameTrimmed.value) return;

    loginDemo(userNameTrimmed.value);
    addToast({
        title: 'Signed in',
        description: `Hi, ${userNameTrimmed.value}!`,
        variant: 'success',
    });
    navigateTo(resolveRedirectTarget());
}

function handleLogout() {
    const name = session.value?.userName || 'User';

    logout();
    addToast({
        title: 'Logged out',
        description: `See you, ${name}!`,
        variant: 'success',
    });
}

function handleGoHome() {
    navigateTo('/');
}
</script>
