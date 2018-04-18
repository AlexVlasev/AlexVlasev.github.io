import json


def element(head, attributes, content=""):
    config = " ".join(f'{key}="{value}"' for key, value in attributes.items() if key != "head")
    return f'<{head} {config}>{content}</{head}>'

sr_only = element("span", {"class": "sr-only"}, "(current)")
dropdown_config = {
    "class": "nav-link dropdown-toggle",
    "href": "#",
    "role": "button",
    "data-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "false"
}


def navbar_item(item, active=False, active_option=""):
    if item["type"] == "link":
        return navbar_link(item, active)
    elif item["type"] == "dropdown":
        return navbar_dropdown(item, active, active_option)


def navbar_link(data, active=False):
    cls = "nav-item"
    title = data['title']
    if active:
        cls += " active"
        title += sr_only
    return element("li", {"class": cls}, element("a", {"class": "nav-link", "href": data["href"]}, title))


def navbar_dropdown(data, active=False, active_option=""):
    cls = "nav-item dropdown"
    title = data['title']
    menu_options = []
    for option in data["options"]:
        activate = option['title'] == active_option
        item = navbar_dropdown_item(option, activate)
        menu_options.append(item)
        if activate:
            cls = "nav-item dropdown active"
            title = data['title'] + sr_only
    config = element("a", dropdown_config, title)
    menu_options = f'\n{6*"  "}' + f'\n{6*"  "}'.join(navbar_dropdown_item(option, option['title'] == active_option) for option in data["options"])
    menu = element("div", {"class": "dropdown-menu", "aria-labelledby": "navbarDropdown"}, menu_options)
    items = [config, menu]
    return element("li", {"class": cls}, f'\n{5*"  "}'.join(items))


def navbar_dropdown_item(data, active=False):
    cls = "dropdown-item"
    title = data['title']
    if active:
        cls += " active"
        title += sr_only
    return element("a", {"class": cls, "href": data["href"]}, title)

if __name__ == '__main__':
    with open("template.html", "r") as infile:
        template = "".join(infile.readlines())
    with open("json/scripts.json", 'r') as infile:
        scripts_data = json.load(infile)
    with open("json/navbar.json", 'r') as infile:
        navbar_data = json.load(infile)["navbar-items"]
    with open("json/pages.json", 'r') as infile:
        pages_data = json.load(infile)

    scripts = {name: element(data["head"], data) for name, data in scripts_data.items()}
    default_script_names = ["jquery.js", "popper.js", "bootstrap.css", "bootstrap.js"]
    navbar_keys = ["home", "software", "math", "lifestyle", "about"]

    for page in pages_data:
        scripts_to_add = [script_name for script_name in default_script_names]
        if page["include-math"]:
            scripts_to_add.append("mathjax.js")
        if page["include-p5"]:
            scripts_to_add.append("p5.js")
            scripts_to_add.append("p5.dom.js")
        scripts_html = '\n    '.join(scripts[name] for name in scripts_to_add)

        title = page["title"]
        navbar_items = (navbar_item(navbar_data[name], name == page["name"], title) for name in navbar_data)
        navbar_html = f'\n{5*"  "}'.join(navbar_items)
        with open(f'content/{page["name"]}-content.html', 'r') as infile:
            content_html = "".join(infile.readlines())

        page_items = {
            "title": "The Lopsided Life" + f' - {title}',
            "author": "Alexander Vlasev",
            "description": page["description"],
            "brand": "The Lopsided Life",
            "scripts": scripts_html,
            "navbar": navbar_html,
            "content": content_html
        }

        webpage = template.format(**page_items)
        with open(f'{page["name"]}.html', 'w') as outfile:
            outfile.write(webpage)
