import { MdxPage, pageMeta } from "~/components/MdxPage";
import Content, { frontmatter } from "~/content/life/ballroom.mdx";

export const meta = () => pageMeta(frontmatter);

export default function Ballroom() {
    return <MdxPage content={Content} />;
}
