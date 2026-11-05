import { MdxPage, pageMeta } from "~/components/MdxPage";
import Content, { frontmatter } from "~/content/life/photography.mdx";

export const meta = () => pageMeta(frontmatter);

export default function Photography() {
    return <MdxPage content={Content} />;
}
