export type ThemeMode = 'light' | 'dark';

export function useDarkMode() {
    const themeCookie = useCookie<ThemeMode>('ui_theme', {
        default: () => 'dark',
    });
    const themeMode = useState<ThemeMode>(
        'ui_theme_mode',
        () => themeCookie.value,
    );

    const isDarkModeEnabled = computed(() => themeMode.value === 'dark');

    useHead(() => ({
        htmlAttrs: {
            class: isDarkModeEnabled.value ? 'dark' : undefined,
        },
    }));

    function applyThemeModeToDocument(nextMode: ThemeMode) {
        if (!import.meta.client) return;

        const root = document.documentElement;

        root.style.colorScheme = nextMode;
    }

    function setThemeMode(nextMode: ThemeMode) {
        themeMode.value = nextMode;
        themeCookie.value = nextMode;
    }

    function toggleThemeMode() {
        if (themeMode.value === 'dark') {
            setThemeMode('light');

            return;
        }

        setThemeMode('dark');
    }

    watch(
        themeMode,
        (nextMode) => {
            applyThemeModeToDocument(nextMode);
        },
        { immediate: true },
    );

    return {
        themeMode,
        isDarkModeEnabled,
        setThemeMode,
        toggleThemeMode,
    };
}
