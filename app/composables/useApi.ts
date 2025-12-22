export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequestOptions {
    body?: unknown;
    headers?: Record<string, string>;
    skipAuth?: boolean;
}

export interface ApiResponse<T = unknown> {
    data: ComputedRef<T | null>;
    error: ComputedRef<Error | null>;
    isLoading: ComputedRef<boolean>;
    execute: () => Promise<T | null>;
}

export function useApi<T = unknown>(
    method: Method,
    url: string | (() => string),
    options: ApiRequestOptions = {},
): ApiResponse<T> {
    const config = useRuntimeConfig();

    const isLoading = ref(false);
    const data = ref<T | null>(null);
    const error = ref<Error | null>(null);

    const skipAuth = options.skipAuth ?? false;

    function buildUrl(path: string): string {
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }

        const apiBase = config.public.apiBase;

        if (!apiBase) {
            return path;
        }

        const baseUrl = apiBase.endsWith('/') ? apiBase.slice(0, -1) : apiBase;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;

        return `${baseUrl}${cleanPath}`;
    }

    async function execute(): Promise<T | null> {
        if (isLoading.value) return null;

        isLoading.value = true;
        error.value = null;

        try {
            const path = typeof url === 'function' ? url() : url;

            if (!path) {
                throw new Error('URL is required');
            }

            const endpoint = buildUrl(path);

            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                ...options.headers,
            };

            const response = await $fetch<T>(endpoint, {
                method,
                credentials: 'include',
                body:
                    method !== 'GET' && options.body
                        ? (options.body as BodyInit)
                        : undefined,
                headers,
            });

            data.value = response;

            return response;
        } catch (err: unknown) {
            if (
                !skipAuth &&
                err &&
                typeof err === 'object' &&
                'statusCode' in err &&
                err.statusCode === 401
            ) {
                const { refreshAccessToken, logout } = useAuthSession();
                const refreshed = await refreshAccessToken();

                if (refreshed) {
                    try {
                        const path = typeof url === 'function' ? url() : url;
                        const endpoint = buildUrl(path);

                        const retryHeaders: Record<string, string> = {
                            'Content-Type': 'application/json',
                            ...options.headers,
                        };

                        const retryResponse = await $fetch<T>(endpoint, {
                            method,
                            credentials: 'include',
                            body:
                                method !== 'GET' && options.body
                                    ? (options.body as BodyInit)
                                    : undefined,
                            headers: retryHeaders,
                        });

                        data.value = retryResponse;

                        return retryResponse;
                    } catch (retryErr) {
                        await logout();
                        navigateTo('/login');
                        const apiError =
                            retryErr instanceof Error
                                ? retryErr
                                : new Error('Wystąpił nieoczekiwany błąd');

                        error.value = apiError;

                        return null;
                    }
                } else {
                    await logout();
                    navigateTo('/login');
                    const apiError = new Error('Sesja wygasła');

                    error.value = apiError;

                    return null;
                }
            }

            const apiError =
                err instanceof Error
                    ? err
                    : new Error('Wystąpił nieoczekiwany błąd');

            error.value = apiError;

            return null;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        data: computed(() => data.value),
        error: computed(() => error.value),
        isLoading: computed(() => isLoading.value),
        execute,
    };
}

export function useApiLazy<T = unknown>(
    method: Method,
    url: string | (() => string),
    options: ApiRequestOptions = {},
): ApiResponse<T> {
    const api = useApi<T>(method, url, options);

    onMounted(() => {
        api.execute();
    });

    return api;
}
