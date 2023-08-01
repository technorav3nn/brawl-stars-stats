import { Space, Tabs } from "@mantine/core";
import { navigate } from "rakkasjs";
import { useState } from "react";

export default function TabsDemo({ children }: React.PropsWithChildren) {
    const [value, setValue] = useState<"a" | "b">("a");

    return (
        <>
            <Tabs
                value={value}
                onTabChange={(value) => {
                    setValue(value as any);
                    navigate(`/tabs/${value}`);
                }}
            >
                <Tabs.List>
                    <Tabs.Tab value="a">First tab</Tabs.Tab>
                    <Tabs.Tab value="b">Second tab</Tabs.Tab>
                </Tabs.List>
            </Tabs>
            <Space h="md" />
            {children}
        </>
    );
}
