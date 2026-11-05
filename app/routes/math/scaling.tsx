import { MathPage } from "~/components/MathPage";
import { pageMeta } from "~/components/MdxPage";
import Content, { frontmatter } from "~/content/math/scaling.mdx";

export const meta = () => pageMeta(frontmatter);

export default function Scaling() {
    return <MathPage content={Content} />;
}
