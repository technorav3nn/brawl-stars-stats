import "nprogress/nprogress.css";

import nProgress from "nprogress";
import { useLocation } from "rakkasjs";
import { useEffect, useRef } from "react";

export function RouterProgress() {
    const { pending } = useLocation();
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

        if (pending) {
            handleStart();
        } else {
            handleComplete();
        }

        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, [pending]);

    return <></>;
}
