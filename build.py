# Open the template
# Load global information, like layout and navbar and such
# For each page
#   Load page-specific information
#   Do some computations on the input
#   Fill in the template with a dictionary of some sort
#   Save the page

import json

indent = 2
meta_info = {
    "title": "The Lopsided Life",
    "author": "Alexander Vlasev",
    "description": "This is my personal website",
}


def element(head, attributes, content=""):
    config = " ".join(f'{key}="{value}"' for key, value in attributes.items() if key != "head")
    return f'<{head} {config}>{content}</{head}>'


def navbar_item(item, active=False):
    if item["type"] == "link":
        return navbar_link(item, active)
    elif item["type"] == "dropdown":
        return navbar_dropdown(item, active)


def navbar_link(data, active=False):
    cls = "nav-item"
    title = data['title']
    if active:
        cls += " active"
        title += sr_only
    return element("li", {"class": cls}, element("a", {"class": "nav-link", "href": "#"}, title))


dropdown_config = {
    "class": "nav-link dropdown-toggle",
    "href": "#",
    "role": "button",
    "data-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "false"
}
sr_only = element("span", {"class": "sr-only"}, "(current)")


def navbar_dropdown(data, active=False, active_option=""):
    cls = "nav-item dropdown"
    title = data['title']
    if active:
        cls += " active"
        title += sr_only
    config = element("a", dropdown_config, title)
    menu_options = f'\n{6*"  "}' + f'\n{6*"  "}'.join(navbar_dropdown_item(option, option['title'] == active_option) for option in data["options"])
    menu = element("div", {"class": "dropdown-menu", "aria-labelledby": "navbarDropdown"}, menu_options)
    items = [config, menu]
    return element("li", {"class": "nav-item dropdown"}, f'\n{5*"  "}'.join(items))


def navbar_dropdown_item(data, active=False):
    cls = "dropdown-item"
    title = data['title']
    if active:
        cls += " active"
        title += sr_only
    return element("a", {"class": cls, "href": data["href"]}, title)


with open("template.html", "r") as infile:
    template = "".join(infile.readlines())
with open("scripts.json", 'r') as infile:
    scripts_data = json.load(infile)
with open("navbar.json", 'r') as infile:
    navbar_data = json.load(infile)

scripts = {name: element(data["head"], data) for name, data in scripts_data.items()}
scripts_to_add = ["jquery.js", "popper.js", "bootstrap.css", "bootstrap.js", "p5.js", "p5.dom.js"]
scripts_html = '\n    '.join(scripts[name] for name in scripts_to_add)

navbar_keys = ["home", "software", "math", "lifestyle", "about"]
navbar_html = f'\n{5*"  "}'.join(navbar_item(navbar_data["navbar-items"][name]) for name in navbar_data["navbar-items"])
content_html = ""

page_items = {
    "title": "The Lopsided Life",
    "author": "Alexander Vlasev",
    "description": "This is my personal website",
    "brand": "The Lopsided Life",
    "scripts": scripts_html,
    "navbar": navbar_html,
    "content": content_html
}
webpage = template.format(**page_items)
with open("example.html", 'w') as outfile:
    outfile.write(webpage)