import type p5 from "p5";
import { useEffect, useRef, useState } from "react";

import styles from "~/components/P5Sketch.module.css";

export type Sketch = (p: p5, host: HTMLElement) => void;

type P5SketchProps = {
    sketch: Sketch;
    // inline: sized by the sketch and stops on its own.
    // wide: fills the page width and animates until paused.
    // background: a decorative layer behind the page that animates until paused.
    variant?: "inline" | "wide" | "background";
    // Describes the sketch to screen readers. Not needed for a background.
    label?: string;
    // Changing this redraws the sketch, including while it's paused.
    redrawKey?: string;
};

export function P5Sketch({
    sketch,
    variant = "inline",
    label,
    redrawKey,
}: P5SketchProps) {
    const host = useRef<HTMLDivElement>(null);
    const instance = useRef<p5 | null>(null);
    const [paused, setPaused] = useState(false);
    const pausable = variant !== "inline";
    const decorative = variant === "background";

    // p5 needs a browser, so it can only load after the pre-rendered page has mounted.
    useEffect(() => {
        let unmounted = false;

        import("p5").then(({ default: P5 }) => {
            if (unmounted || !host.current) return;
            const element = host.current;
            instance.current = new P5((p) => sketch(p, element), element);

            if (
                pausable &&
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
    }, [sketch, pausable]);

    useEffect(() => {
        instance.current?.redraw();
    }, [redrawKey]);

    const togglePaused = () => {
        if (paused) {
            instance.current?.loop();
        } else {
            instance.current?.noLoop();
        }
        setPaused(!paused);
    };

    return (
        <div className={styles[variant]}>
            <div
                ref={host}
                className={decorative ? styles.backgroundLayer : undefined}
                role={decorative ? undefined : "img"}
                aria-label={label}
                aria-hidden={decorative || undefined}
            />
            {pausable && (
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
