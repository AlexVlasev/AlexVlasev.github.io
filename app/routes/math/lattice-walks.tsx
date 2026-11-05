import { MathPage } from "~/components/MathPage";
import { pageMeta } from "~/components/MdxPage";
import Content, { frontmatter } from "~/content/math/lattice-walks.mdx";

export const meta = () => pageMeta(frontmatter);

export default function LatticeWalks() {
    return <MathPage content={Content} />;
}
