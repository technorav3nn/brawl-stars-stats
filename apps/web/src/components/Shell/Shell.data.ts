/* eslint-disable sort-keys-fix/sort-keys-fix */
interface ShellLink {
    label: string;
    href: string;
}

export const SHELL_LINKS: ShellLink[] = [
    {
        label: "Brawlers",
        href: "/brawlers",
    },
    {
        label: "Events",
        href: "/events",
    },
    {
        label: "Maps",
        href: "/maps",
    },
    {
        label: "Global",
        href: "/leaderboard",
    },
];
