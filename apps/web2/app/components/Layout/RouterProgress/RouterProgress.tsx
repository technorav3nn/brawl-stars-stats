import "nprogress/nprogress.css";

import nProgress from "nprogress";
import { useEffect, useRef } from "react";
import { useNavigation } from "@remix-run/react";

export function RouterProgress() {
    const transition = useNavigation();
    const active = transition.state !== "idle";
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

        // check transition
        if (active) {
            handleStart();
        } else {
            handleComplete();
        }

        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, []);

    return <></>;
}
