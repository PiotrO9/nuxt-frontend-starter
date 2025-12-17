export default defineNuxtRouteMiddleware((to) => {
    const authTokenCookie = useCookie<string | null>('auth_token', {
        default: () => null,
    });

    if (authTokenCookie.value) return;

    const redirectTarget = to.fullPath || '/';

    return navigateTo({
        path: '/login',
        query: { redirect: redirectTarget },
    });
});
