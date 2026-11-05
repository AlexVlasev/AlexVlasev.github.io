import { MdxPage, pageMeta } from "~/components/MdxPage";
import Content, { frontmatter } from "~/content/life/parkour.mdx";

export const meta = () => pageMeta(frontmatter);

export default function Parkour() {
    return <MdxPage content={Content} />;
}
