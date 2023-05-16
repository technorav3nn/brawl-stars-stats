import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

export function RouterProgress() {
    const router = useRouter();
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleStart = () => {
            // only show progress bar if page hasn't loaded 150ms
            timer.current = setTimeout(() => {
                nProgress.start();
            }, 150);
        };
        const handleComplete = () => {
            nProgress.configure({ speed: 200 });
            if (timer.current) clearTimeout(timer.current);
            nProgress.done();
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router.asPath]);

    return <></>;
}
