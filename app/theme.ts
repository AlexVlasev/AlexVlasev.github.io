import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = "dark";

// Runs in <head> before first paint, so a saved light theme doesn't flash dark on load.
export const themeInitScript = `try {
    if (localStorage.getItem("${STORAGE_KEY}") === "light") {
        document.documentElement.dataset.theme = "light";
    }
} catch {}`;

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

function getTheme() {
    return document.documentElement.dataset.theme as Theme;
}

function setTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {
        // Storage can be blocked. The theme still applies until the next page load.
    }
    listeners.forEach((listener) => listener());
}

export function useTheme() {
    const theme = useSyncExternalStore(
        subscribe,
        getTheme,
        () => DEFAULT_THEME,
    );
    return { theme, setTheme };
}
