import { MathPage } from "~/components/MathPage";
import { pageMeta } from "~/components/MdxPage";
import Content, {
    frontmatter,
} from "~/content/math/electromagnetic-operators.mdx";

export const meta = () => pageMeta(frontmatter);

export default function ElectromagneticOperators() {
    return <MathPage content={Content} />;
}
