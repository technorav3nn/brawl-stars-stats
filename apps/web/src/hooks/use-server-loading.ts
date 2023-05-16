import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function useServerLoading() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        router.isReady && setIsLoading(false);
    }, []);

    return isLoading;
}
