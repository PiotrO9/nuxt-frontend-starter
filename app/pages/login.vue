<script setup lang="ts">
useHead({
    title: 'Login',
});

const route = useRoute();
const { addToast } = useToast();
const { isAuthenticated, session, login, logout } = useAuthSession();

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const emailTrimmed = computed(() => email.value.trim());
const passwordTrimmed = computed(() => password.value.trim());
const isFormValid = computed(
    () => emailTrimmed.value.length > 0 && passwordTrimmed.value.length > 0,
);

function resolveRedirectTarget(): string {
    const redirectQuery = route.query.redirect;

    if (!redirectQuery) return '/protected';

    if (Array.isArray(redirectQuery)) return redirectQuery[0] || '/protected';

    return redirectQuery;
}

async function handleLogin() {
    if (isAuthenticated.value) {
        addToast({
            title: 'Już zalogowany',
            description: 'Możesz kontynuować.',
            variant: 'info',
        });
        navigateTo(resolveRedirectTarget());

        return;
    }

    if (!isFormValid.value) return;

    isLoading.value = true;

    try {
        await login(emailTrimmed.value, passwordTrimmed.value);
        addToast({
            title: 'Zalogowano',
            description: `Witaj, ${session.value?.userName || emailTrimmed.value}!`,
            variant: 'success',
        });
        navigateTo(resolveRedirectTarget());
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : 'Błąd podczas logowania';

        addToast({
            title: 'Błąd logowania',
            description: errorMessage,
            variant: 'error',
        });
    } finally {
        isLoading.value = false;
    }
}

function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        handleLogin();
    }
}

function handleLogout() {
    const name = session.value?.userName || 'User';

    logout();
    addToast({
        title: 'Wylogowano',
        description: `Do zobaczenia, ${name}!`,
        variant: 'success',
    });
}

function handleGoHome() {
    navigateTo('/');
}
</script>

<template>
    <div class="mx-auto w-full max-w-xl space-y-6">
        <div class="space-y-2">
            <h1 class="text-2xl font-extrabold tracking-tight">Logowanie</h1>
            <p class="text-slate-700 dark:text-slate-300">
                Zaloguj się używając email i hasła. Tokeny JWT są przechowywane
                w bezpiecznych HTTP-only cookies.
            </p>
        </div>

        <Card aria-label="Card: Login form">
            <template #header>
                <p
                    class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                >
                    Sesja
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
                                ? `zalogowany jako ${session?.userName}`
                                : 'wylogowany'
                        }}
                    </span>
                </p>

                <div v-if="!isAuthenticated" class="space-y-4">
                    <div class="space-y-2">
                        <label
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300"
                            for="emailInput"
                            >Email</label
                        >
                        <input
                            id="emailInput"
                            v-model="email"
                            type="email"
                            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus-visible:ring-offset-slate-950"
                            placeholder="np. jan@example.com"
                            aria-label="Wprowadź email"
                            :disabled="isLoading"
                            @keydown="handleKeyDown"
                        />
                    </div>

                    <div class="space-y-2">
                        <label
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300"
                            for="passwordInput"
                            >Hasło</label
                        >
                        <input
                            id="passwordInput"
                            v-model="password"
                            type="password"
                            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus-visible:ring-offset-slate-950"
                            placeholder="Wprowadź hasło"
                            aria-label="Wprowadź hasło"
                            :disabled="isLoading"
                            @keydown="handleKeyDown"
                        />
                    </div>
                </div>

                <div class="flex flex-wrap gap-2">
                    <Button
                        v-if="!isAuthenticated"
                        aria-label="Zaloguj się"
                        :is-disabled="!isFormValid || isLoading"
                        @click="handleLogin"
                    >
                        {{ isLoading ? 'Logowanie...' : 'Zaloguj się' }}
                    </Button>
                    <Button
                        v-else
                        variant="secondary"
                        aria-label="Wyloguj się"
                        @click="handleLogout"
                    >
                        Wyloguj się
                    </Button>

                    <Button
                        variant="ghost"
                        aria-label="Powrót do strony głównej"
                        @click="handleGoHome"
                    >
                        Strona główna
                    </Button>
                </div>
            </div>
        </Card>
    </div>
</template>
