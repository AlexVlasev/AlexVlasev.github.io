import styles from "~/components/YouTubeEmbed.module.css";

type YouTubeEmbedProps = {
    id: string;
    title: string;
    caption: string;
};

export function YouTubeEmbed({ id, title, caption }: YouTubeEmbedProps) {
    return (
        <figure className={styles.figure}>
            <iframe
                className={styles.player}
                src={`https://www.youtube-nocookie.com/embed/${id}`}
                title={title}
                loading="lazy"
                allow="encrypted-media; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
            <figcaption className={styles.caption}>
                {caption}{" "}
                <a href={`https://www.youtube.com/watch?v=${id}`}>
                    Watch on YouTube
                </a>
            </figcaption>
        </figure>
    );
}
