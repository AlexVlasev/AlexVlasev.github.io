import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, TouchEvent } from "react";

import styles from "~/components/Gallery.module.css";

export type GalleryImage = {
    src: string;
    alt: string;
    width: number;
    height: number;
    // CSS object-position for the square thumbnail crop. Defaults to centre.
    objectPosition?: string;
};

const SWIPE_DISTANCE = 50;

export function Gallery({ images }: { images: GalleryImage[] }) {
    const dialog = useRef<HTMLDialogElement>(null);
    const touchStart = useRef<{ x: number; y: number } | null>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const current = openIndex === null ? null : images[openIndex];
    const count = images.length;

    const step = useCallback(
        (offset: number) => {
            setOpenIndex((index) =>
                index === null ? null : (index + offset + count) % count,
            );
        },
        [count],
    );

    useEffect(() => {
        const element = dialog.current;
        if (!element) return;

        // The photo and buttons are child elements, so a click whose target is
        // the dialog itself landed on the backdrop or the area around the photo.
        function handleClick(event: MouseEvent) {
            if (event.target === element) element?.close();
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "ArrowLeft") step(-1);
            if (event.key === "ArrowRight") step(1);
        }

        element.addEventListener("click", handleClick);
        element.addEventListener("keydown", handleKeyDown);
        return () => {
            element.removeEventListener("click", handleClick);
            element.removeEventListener("keydown", handleKeyDown);
        };
    }, [step]);

    useEffect(() => {
        if (openIndex === null || images.length < 2) return;
        for (const offset of [-1, 1]) {
            const neighbour = openIndex + offset + images.length;
            new Image().src = images[neighbour % images.length].src;
        }
    }, [images, openIndex]);

    function open(event: ReactMouseEvent, index: number) {
        // Leave modified clicks alone so open-in-new-tab keeps working.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }
        event.preventDefault();
        setOpenIndex(index);
        dialog.current?.showModal();
    }

    function handleTouchStart(event: TouchEvent) {
        const touch = event.touches[0];
        touchStart.current =
            event.touches.length === 1
                ? { x: touch.clientX, y: touch.clientY }
                : null;
    }

    function handleTouchEnd(event: TouchEvent) {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start || images.length < 2) return;
        const touch = event.changedTouches[0];
        const dx = touch.clientX - start.x;
        const dy = touch.clientY - start.y;
        if (Math.abs(dx) >= SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) {
            step(dx < 0 ? 1 : -1);
        }
    }

    return (
        <>
            <ul className={styles.gallery}>
                {images.map((image, index) => (
                    <li key={image.src}>
                        <a
                            href={image.src}
                            aria-haspopup="dialog"
                            onClick={(event) => open(event, index)}
                        >
                            <img
                                className={styles.image}
                                style={{
                                    objectPosition: image.objectPosition,
                                }}
                                src={image.src}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                                loading="lazy"
                            />
                        </a>
                    </li>
                ))}
            </ul>
            <dialog
                ref={dialog}
                className={styles.modal}
                aria-label="Photo viewer"
                onClose={() => setOpenIndex(null)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {current && (
                    <img
                        className={styles.modalImage}
                        src={current.src}
                        alt={current.alt}
                    />
                )}
                <button
                    type="button"
                    className={`${styles.control} ${styles.close}`}
                    aria-label="Close"
                    onClick={() => dialog.current?.close()}
                >
                    ×
                </button>
                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            className={`${styles.control} ${styles.previous}`}
                            aria-label="Previous photo"
                            onClick={() => step(-1)}
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            className={`${styles.control} ${styles.next}`}
                            aria-label="Next photo"
                            onClick={() => step(1)}
                        >
                            ›
                        </button>
                    </>
                )}
            </dialog>
        </>
    );
}
