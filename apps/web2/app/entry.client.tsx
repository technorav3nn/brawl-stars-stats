import { createEmotionCache } from "@mantine/core";
import { ClientProvider } from "@mantine/remix";
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { emotionCache } from "./lib/emotion-cache";

function hydrate() {
    startTransition(() => {
        document.querySelectorAll("html > script").forEach((s) => {
            s.parentNode!.removeChild(s);
        });

        hydrateRoot(
            document,
            <StrictMode>
                <ClientProvider emotionCache={emotionCache}>
                    <RemixBrowser />
                </ClientProvider>
            </StrictMode>
        );
    });
}

if (typeof requestIdleCallback === "function") {
    requestIdleCallback(hydrate);
} else {
    // Safari doesn't support requestIdleCallback
    // https://caniuse.com/requestidlecallback
    setTimeout(hydrate, 1);
}
