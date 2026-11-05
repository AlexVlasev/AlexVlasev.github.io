import { useTheme } from "~/theme";

import styles from "~/components/ThemeToggle.module.css";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const next = theme === "dark" ? "light" : "dark";

    return (
        <button
            type="button"
            className={styles.toggle}
            aria-label={`Switch to ${next} mode`}
            onClick={() => setTheme(next)}
        >
            <svg viewBox="0 0 24 24" aria-hidden="true">
                {theme === "dark" ? (
                    <>
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
                    </>
                ) : (
                    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
                )}
            </svg>
        </button>
    );
}
