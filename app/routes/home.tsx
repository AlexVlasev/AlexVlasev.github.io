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
                My name is Alexander Vlasev and this is my personal website. I
                have various experiences in life that I wish to collect in one
                place to show anyone who wishes to know about me. I find that my
                life feels the best when I engage it on multiple levels - both
                mental and physical. Check out{" "}
                <a href="https://www.linkedin.com/in/alexvlasev/">
                    my LinkedIn page
                </a>{" "}
                for a professional view and{" "}
                <a href="https://www.instagram.com/alex.vlasev">
                    my Instagram page
                </a>{" "}
                for a view into my hobbies and lifestyle.
            </p>
            <p>
                On the mental side of things, I studied Mathematics for about 8
                years and obtained a BSc and an MSc in the subject. Later I made
                a career change and currently work my way through the different
                facets of software development. In the future, I envision myself
                in a leadership role either at an established company or at a
                company I create.
            </p>
            <p>
                On the physical side of things, I trained Parkour from 2004 to
                2011 and Ballroom Dancing from 2011 to 2016. I consider myself
                semi-professional at both, since I participated in many projects
                in film/commercials and participated in various shows. To
                support these activities, I keep in shape through diet and
                weight lifting.
            </p>
            <p>
                I built the site myself, hosted it on GitHub Pages and use
                Squarespace for the domain. The site is being rebuilt with React
                and is under construction, so this is not the final experience,
                and some pages still have the old look. Feel free to check out
                the different pages.
            </p>
        </>
    );
}
