import { MdxPage, pageMeta } from "~/components/MdxPage";
import Content, { frontmatter } from "~/content/demos/a-star.mdx";

export const meta = () => pageMeta(frontmatter);

export default function AStarDemo() {
    return <MdxPage content={Content} />;
}
