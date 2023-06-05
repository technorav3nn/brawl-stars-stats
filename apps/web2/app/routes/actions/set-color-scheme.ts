import { ActionFunction, json, redirect } from "@remix-run/node";
import { getColorSchemeSession } from "~/lib/util/color-scheme.server";

export const action: ActionFunction = async ({ request }) => {
    const formData = new URLSearchParams(await request.text());
    console.log(formData);
    const colorSchemeSession = await getColorSchemeSession(request);

    const nextColorScheme = formData.get("colorScheme") as "dark" | "light";

    colorSchemeSession.setColorScheme(nextColorScheme);
    console.log(colorSchemeSession.getColorScheme());
    return json(
        { success: true },
        { headers: { "Set-Cookie": await colorSchemeSession.commit() } }
    );
};

export const loader = () => redirect("/", { status: 404 });
