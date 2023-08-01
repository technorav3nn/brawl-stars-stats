import { Card } from "@mantine/core";
import type { PreloadFunction } from "rakkasjs";

export const preload: PreloadFunction = () => {
    return {
        head: {
            title: "Tabs demo",
        },
        meta: {},
    };
};

export default function TabsDemo() {
    return (
        <>
            <Card>Hello</Card>
        </>
    );
}
