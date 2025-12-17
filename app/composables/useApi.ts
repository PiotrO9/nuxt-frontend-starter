export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type ApiRequestOptions = {
    body?: unknown;
    headers?: Record<string, string>;
    skipAuth?: boolean;
};

export type ApiResponse<T = unknown> = {
    data: ComputedRef<T | null>;
    error: ComputedRef<Error | null>;
    isLoading: ComputedRef<boolean>;
    execute: () => Promise<T | null>;
};

export function useApi<T = unknown>(
    method: Method,
    url: string | (() => string),
    options: ApiRequestOptions = {},
): ApiResponse<T> {
    const { session } = useAuthSession();
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

            if (!skipAuth && session.value?.token) {
                headers.Authorization = `Bearer ${session.value.token}`;
            }

            const response = await $fetch<T>(endpoint, {
                method,
                body:
                    method !== 'GET' && options.body
                        ? (options.body as BodyInit)
                        : undefined,
                headers,
            });

            data.value = response;

            return response;
        } catch (err) {
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
