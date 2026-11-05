import { MdxPage, pageMeta } from "~/components/MdxPage";
import Content, { frontmatter } from "~/content/about.mdx";

export const meta = () => pageMeta(frontmatter);

export default function About() {
    return <MdxPage content={Content} />;
}
