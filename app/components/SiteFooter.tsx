import { socialLinks } from "~/navigation";

import styles from "~/components/SiteFooter.module.css";

export function SiteFooter() {
    return (
        <footer className={styles.footer}>
            <div className={styles.bar}>
                <span>Alexander Vlasev</span>
                <ul className={styles.links}>
                    {socialLinks.map((link) => (
                        <li key={link.href}>
                            <a href={link.href} rel="me noopener">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}
