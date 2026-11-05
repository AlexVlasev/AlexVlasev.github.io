import { useEffect, useRef } from "react";

import { MdxPage } from "~/components/MdxPage";

import "~/styles/math.css";

type MathPageProps = {
    content: Parameters<typeof MdxPage>[0]["content"];
};

export function MathPage({ content }: MathPageProps) {
    const container = useRef<HTMLDivElement>(null);

    // Equations wider than the page scroll sideways, and only those need to be reachable by keyboard.
    useEffect(() => {
        const updateFocusableEquations = () => {
            container.current
                ?.querySelectorAll<HTMLElement>(".katex-display")
                .forEach((equation) => {
                    if (equation.scrollWidth > equation.clientWidth) {
                        equation.tabIndex = 0;
                    } else {
                        equation.removeAttribute("tabindex");
                    }
                });
        };
        updateFocusableEquations();
        window.addEventListener("resize", updateFocusableEquations);
        return () =>
            window.removeEventListener("resize", updateFocusableEquations);
    }, []);

    return (
        <div ref={container}>
            <MdxPage content={content} />
        </div>
    );
}
