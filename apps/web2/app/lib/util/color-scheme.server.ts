import { createCookieSessionStorage } from "@remix-run/node";

type Theme = "dark" | "light";

const sessionSecret = "this-secret-doesnt-matter";

const colorSchemeStorage = createCookieSessionStorage({
    cookie: {
        name: "mantine_theme",
        secure: false,
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        httpOnly: false,
    },
});

async function getColorSchemeSession(request: Request) {
    const session = await colorSchemeStorage.getSession(request.headers.get("Cookie"));
    return {
        getColorScheme: () => {
            const themeValue = session.get("theme");
            return themeValue === "dark" || themeValue === "light" ? themeValue : null;
        },
        setColorScheme: (theme: Theme) => session.set("theme", theme),
        commit: () => colorSchemeStorage.commitSession(session),
    };
}

export { getColorSchemeSession };
