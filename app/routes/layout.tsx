import { Outlet } from "react-router";

import { SiteFooter } from "~/components/SiteFooter";
import { SiteHeader } from "~/components/SiteHeader";

import styles from "~/routes/layout.module.css";

export default function SiteLayout() {
    return (
        <>
            <a href="#content" className={styles.skipLink}>
                Skip to content
            </a>
            <SiteHeader />
            <main id="content" className={styles.main}>
                <Outlet />
            </main>
            <SiteFooter />
        </>
    );
}
