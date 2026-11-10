import { Link } from "react-router";

// Update this entry whenever a new page or feature is added to the site.
const latestAddition = {
    title: "Parkour showreel",
    href: "/life/parkour",
    blurb: "A video of some of my moves from May 2010.",
};

export function meta() {
    return [
        { title: "Alex Vlasev" },
        {
            name: "description",
            content:
                "Personal website of Alexander Vlasev: software, mathematics, parkour, ballroom dancing and photography.",
        },
    ];
}

export default function Home() {
    return (
        <>
            <h1>Welcome</h1>
            <p>
                This is where I share different projects and aspects of my life,
                from <Link to="/math/lattice-walks">mathematics</Link> and{" "}
                <Link to="/demos/a-star">software demos</Link> to{" "}
                <Link to="/life/parkour">Parkour</Link>,{" "}
                <Link to="/life/ballroom">ballroom dancing</Link> and{" "}
                <Link to="/life/photography">photography</Link>.
            </p>
            <p>
                <strong>Latest addition:</strong>{" "}
                <Link to={latestAddition.href}>{latestAddition.title}</Link>.{" "}
                {latestAddition.blurb}
            </p>
        </>
    );
}
