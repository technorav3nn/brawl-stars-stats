import { useLocation } from "rakkasjs";
import { useEffect, useState } from "react";

export function useServerLoading() {
    const [isLoading, setIsLoading] = useState(true);
    const { pending } = useLocation();

    useEffect(() => {
        setIsLoading;
    }, [pending]);

    return isLoading;
}
