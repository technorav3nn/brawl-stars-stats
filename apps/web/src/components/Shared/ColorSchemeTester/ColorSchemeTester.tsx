"use client";

import { Button, Group, useMantineColorScheme } from "@mantine/core";
import { useWindowEvent } from "@mantine/hooks";
import { useState, useTransition } from "react";

export function ColorSchemeTester() {
    const { setColorScheme: setMantineColorScheme } = useMantineColorScheme();
    const [, startTransition] = useTransition();
    const [canChange, setCanChange] = useState(true);

    useWindowEvent("DOMContentLoaded", () => {
        setCanChange(true);
    });

    const setColorScheme = (scheme: "light" | "dark" | "auto") => {
        if (!canChange) return;
        startTransition(() => setMantineColorScheme(scheme));
    };

    return (
        <>
            <Group justify="center" mt="xl">
                <Button onClick={() => setColorScheme("light")}>Light</Button>
                <Button onClick={() => setColorScheme("dark")}>Dark</Button>
                <Button onClick={() => setColorScheme("auto")}>Auto</Button>
            </Group>
        </>
    );
}
