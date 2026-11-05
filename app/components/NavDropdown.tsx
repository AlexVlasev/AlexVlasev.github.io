import { useEffect, useId, useRef, useState } from "react";

import { SiteLink } from "~/components/SiteLink";
import type { NavGroup } from "~/navigation";

import styles from "~/components/SiteHeader.module.css";

type NavDropdownProps = {
    group: NavGroup;
    onNavigate: () => void;
};

export function NavDropdown({ group, onNavigate }: NavDropdownProps) {
    const [open, setOpen] = useState(false);
    const container = useRef<HTMLLIElement>(null);
    const button = useRef<HTMLButtonElement>(null);
    const panelId = useId();

    useEffect(() => {
        if (!open) return;
        const closeIfOutside = (event: Event) => {
            if (!container.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
                button.current?.focus();
            }
        };
        document.addEventListener("pointerdown", closeIfOutside);
        document.addEventListener("focusin", closeIfOutside);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeIfOutside);
            document.removeEventListener("focusin", closeIfOutside);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [open]);

    return (
        <li ref={container} className={styles.item}>
            <button
                ref={button}
                type="button"
                className={styles.link}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen(!open)}
            >
                {group.label}
                <span className={styles.caret} aria-hidden="true" />
            </button>
            <ul id={panelId} className={styles.panel} hidden={!open}>
                {group.items.map((item) => (
                    <li key={item.href}>
                        <SiteLink
                            item={item}
                            className={styles.panelLink}
                            onClick={() => {
                                setOpen(false);
                                onNavigate();
                            }}
                        />
                    </li>
                ))}
            </ul>
        </li>
    );
}
