import type { ComponentProps, ComponentType } from "react";
import { Link } from "react-router";

export type MdxFrontmatter = {
    title: string;
    description: string;
};

export function pageMeta({ title, description }: MdxFrontmatter) {
    return [
        { title: `${title} - Alex Vlasev` },
        { name: "description", content: description },
    ];
}

function MdxLink({ href = "", children, ...props }: ComponentProps<"a">) {
    return href.startsWith("/") ? (
        <Link to={href} {...props}>
            {children}
        </Link>
    ) : (
        <a href={href} {...props}>
            {children}
        </a>
    );
}

const components = { a: MdxLink };

type MdxPageProps = {
    content: ComponentType<{
        components?: { a?: ComponentType<ComponentProps<"a">> };
    }>;
};

export function MdxPage({ content: Content }: MdxPageProps) {
    return <Content components={components} />;
}
