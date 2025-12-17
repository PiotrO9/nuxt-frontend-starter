export type AuthSession = {
    token: string;
    userName: string;
};

export function useAuthSession() {
    const authTokenCookie = useCookie<string | null>('auth_token', {
        default: () => null,
    });
    const authUserNameCookie = useCookie<string | null>('auth_user_name', {
        default: () => null,
    });

    const session = useState<AuthSession | null>('auth_session', () => {
        if (!authTokenCookie.value || !authUserNameCookie.value) return null;

        return {
            token: authTokenCookie.value,
            userName: authUserNameCookie.value,
        };
    });

    const isAuthenticated = computed(() => Boolean(session.value?.token));

    function loginDemo(userName: string) {
        if (!userName) return;

        const token = `demo_${Date.now()}`;

        authTokenCookie.value = token;
        authUserNameCookie.value = userName;
        session.value = { token, userName };
    }

    function logout() {
        authTokenCookie.value = null;
        authUserNameCookie.value = null;
        session.value = null;
    }

    return {
        session,
        isAuthenticated,
        loginDemo,
        logout,
    };
}
