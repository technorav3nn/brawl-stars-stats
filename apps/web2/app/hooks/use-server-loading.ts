import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useServerLoading() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        router.isReady && setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isLoading;
}
