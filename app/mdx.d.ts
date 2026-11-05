declare module "*.mdx" {
    export const frontmatter: {
        title: string;
        description: string;
    };
    const MDXContent: React.ComponentType<{
        components?: {
            a?: React.ComponentType<React.ComponentProps<"a">>;
        };
    }>;
    export default MDXContent;
}
