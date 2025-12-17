<template>
    <div class="mx-auto w-full max-w-3xl space-y-6">
        <div class="space-y-2">
            <h1 class="text-2xl font-extrabold tracking-tight">Protected</h1>
            <p class="text-slate-700">
                This page uses `middleware/auth`. If the session cookie is
                missing, you'll be redirected to `/login`.
            </p>
        </div>

        <Card aria-label="Card: Session details">
            <template #header>
                <p
                    class="text-sm font-semibold text-slate-900"
                >
                    Session
                </p>
            </template>

            <div class="space-y-2 text-sm">
                <p class="text-slate-600">
                    Zalogowany jako:
                    <span
                        class="font-semibold text-slate-900"
                        >{{ session?.userName }}</span
                    >
                </p>
                <p class="break-all text-slate-500">
                    Token:
                    <span
                        class="font-mono text-slate-700"
                        >{{ session?.token }}</span
                    >
                </p>
            </div>

            <template #footer>
                <div class="flex flex-wrap gap-2">
                    <Button
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
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
});

const { addToast } = useToast();
const { session, logout } = useAuthSession();

function handleLogout() {
    logout();
    addToast({
        title: 'Logged out',
        description: 'Session cleared.',
        variant: 'success',
    });
    navigateTo('/login');
}

function handleGoHome() {
    navigateTo('/');
}
</script>
