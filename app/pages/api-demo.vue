<script setup lang="ts">
const apiGet = useApi<{
    id: number;
    title: string;
    body: string;
    userId: number;
}>('GET', '/posts/1');

const postBody = ref({
    title: 'Test Post',
    body: 'To jest przykładowy post',
    userId: 1,
});

const apiPost = useApi<{ id: number; title: string; body: string }>(
    'POST',
    '/posts',
    {
        body: postBody.value,
    },
);

function handleApiGet() {
    apiGet.execute();
}

function handleApiPost() {
    const newApiPost = useApi<{ id: number; title: string; body: string }>(
        'POST',
        '/posts',
        {
            body: postBody.value,
        },
    );

    newApiPost.execute();
    Object.assign(apiPost, newApiPost);
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-col gap-2">
            <h1 class="text-2xl font-extrabold tracking-tight">API Demo</h1>
            <p class="text-slate-700 dark:text-slate-300">
                Przykłady użycia composable useApi do odpytywania API oraz
                komponenty UI.
            </p>
        </div>

        <Card aria-label="Card: API Examples">
            <template #header>
                <p
                    class="text-sm font-semibold text-slate-900 dark:text-slate-50"
                >
                    API Examples (useApi)
                </p>
            </template>

            <div class="space-y-4">
                <div class="space-y-2">
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Przykłady użycia composable useApi. Pełne URL-e
                        (http/https) są używane bez zmian, relatywne ścieżki
                        używają base URL z .env (NUXT_PUBLIC_API_BASE).
                    </p>
                    <div class="flex flex-wrap gap-3">
                        <Button
                            :disabled="apiGet.isLoading.value"
                            aria-label="Wykonaj GET request"
                            @click="handleApiGet"
                        >
                            {{
                                apiGet.isLoading.value
                                    ? 'Ładowanie...'
                                    : 'GET Request'
                            }}
                        </Button>
                        <Button
                            variant="secondary"
                            :disabled="apiPost.isLoading.value"
                            aria-label="Wykonaj POST request"
                            @click="handleApiPost"
                        >
                            {{
                                apiPost.isLoading.value
                                    ? 'Ładowanie...'
                                    : 'POST Request'
                            }}
                        </Button>
                    </div>
                </div>

                <div
                    v-if="apiGet.data.value || apiGet.error.value"
                    class="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                    <p
                        class="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400"
                    >
                        GET Response:
                    </p>
                    <pre
                        class="overflow-auto text-xs text-slate-700 dark:text-slate-300"
                        >{{
                            JSON.stringify(
                                apiGet.data.value || apiGet.error.value,
                                null,
                                2,
                            )
                        }}</pre
                    >
                </div>

                <div
                    v-if="apiPost.data.value || apiPost.error.value"
                    class="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                    <p
                        class="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400"
                    >
                        POST Response:
                    </p>
                    <pre
                        class="overflow-auto text-xs text-slate-700 dark:text-slate-300"
                        >{{
                            JSON.stringify(
                                apiPost.data.value || apiPost.error.value,
                                null,
                                2,
                            )
                        }}</pre
                    >
                </div>
            </div>
        </Card>
    </div>
</template>
