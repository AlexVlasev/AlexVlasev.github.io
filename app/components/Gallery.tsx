import styles from "~/components/Gallery.module.css";

export type GalleryImage = {
    src: string;
    alt: string;
    width: number;
    height: number;
};

export function Gallery({ images }: { images: GalleryImage[] }) {
    return (
        <ul className={styles.gallery}>
            {images.map((image) => (
                <li key={image.src}>
                    <a href={image.src}>
                        <img
                            className={styles.image}
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
    );
}
