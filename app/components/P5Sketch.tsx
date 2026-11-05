import type p5 from "p5";
import { useEffect, useRef, useState } from "react";

import styles from "~/components/P5Sketch.module.css";

export type Sketch = (p: p5, host: HTMLElement) => void;

type P5SketchProps = {
    sketch: Sketch;
    label: string;
    // For sketches that animate indefinitely: fills the page width and can be paused.
    continuous?: boolean;
};

export function P5Sketch({ sketch, label, continuous = false }: P5SketchProps) {
    const host = useRef<HTMLDivElement>(null);
    const instance = useRef<p5 | null>(null);
    const [paused, setPaused] = useState(false);

    // p5 needs a browser, so it can only load after the pre-rendered page has mounted.
    useEffect(() => {
        let unmounted = false;

        import("p5").then(({ default: P5 }) => {
            if (unmounted || !host.current) return;
            const element = host.current;
            instance.current = new P5((p) => sketch(p, element), element);

            if (
                continuous &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                instance.current.noLoop();
                setPaused(true);
            }
        });

        return () => {
            unmounted = true;
            instance.current?.remove();
            instance.current = null;
        };
    }, [sketch, continuous]);

    const togglePaused = () => {
        if (paused) {
            instance.current?.loop();
        } else {
            instance.current?.noLoop();
        }
        setPaused(!paused);
    };

    return (
        <div className={continuous ? styles.continuous : styles.sketch}>
            <div ref={host} role="img" aria-label={label} />
            {continuous && (
                <button
                    type="button"
                    className={styles.button}
                    onClick={togglePaused}
                >
                    {paused ? "Resume animation" : "Pause animation"}
                </button>
            )}
        </div>
    );
}
