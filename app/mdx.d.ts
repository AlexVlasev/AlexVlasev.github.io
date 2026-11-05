declare module "*.mdx" {
    export const frontmatter: {
        title: string;
        description: string;
    };
    const MDXContent: React.ComponentType;
    export default MDXContent;
}
