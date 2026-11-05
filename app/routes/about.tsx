import Content, { frontmatter } from "~/content/about.mdx";

export function meta() {
    return [
        { title: `${frontmatter.title} - Alex Vlasev` },
        { name: "description", content: frontmatter.description },
    ];
}

export default function About() {
    return <Content />;
}
