import { MdxPage, pageMeta } from "~/components/MdxPage";
import Content, { frontmatter } from "~/content/demos/perlin-noise.mdx";

export const meta = () => pageMeta(frontmatter);

export default function PerlinNoiseDemo() {
    return <MdxPage content={Content} />;
}
