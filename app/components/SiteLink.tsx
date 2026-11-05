import { NavLink } from "react-router";

import type { NavLinkItem } from "~/navigation";

type SiteLinkProps = {
    item: NavLinkItem;
    className: string;
    onClick?: () => void;
};

export function SiteLink({ item, className, onClick }: SiteLinkProps) {
    return (
        <NavLink
            to={item.href}
            end={item.href === "/"}
            className={className}
            onClick={onClick}
        >
            {item.label}
        </NavLink>
    );
}
