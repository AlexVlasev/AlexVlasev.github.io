import { useId, useState } from "react";
import { Link } from "react-router";

import { NavDropdown } from "~/components/NavDropdown";
import { SiteLink } from "~/components/SiteLink";
import { ThemeToggle } from "~/components/ThemeToggle";
import { navigation } from "~/navigation";

import styles from "~/components/SiteHeader.module.css";

export function SiteHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuId = useId();

    return (
        <header className={styles.header}>
            <div className={styles.bar}>
                <Link to="/" className={styles.brand}>
                    Alex Vlasev
                </Link>
                <nav
                    id={menuId}
                    aria-label="Main"
                    className={styles.nav}
                    data-open={menuOpen}
                >
                    <ul className={styles.list}>
                        {navigation.map((entry) =>
                            "items" in entry ? (
                                <NavDropdown
                                    key={entry.label}
                                    group={entry}
                                    onNavigate={() => setMenuOpen(false)}
                                />
                            ) : (
                                <li key={entry.href} className={styles.item}>
                                    <SiteLink
                                        item={entry}
                                        className={styles.link}
                                        onClick={() => setMenuOpen(false)}
                                    />
                                </li>
                            ),
                        )}
                    </ul>
                </nav>
                <div className={styles.actions}>
                    <ThemeToggle />
                    <button
                        type="button"
                        className={styles.menuButton}
                        aria-label="Menu"
                        aria-expanded={menuOpen}
                        aria-controls={menuId}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 7h16M4 12h16M4 17h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
