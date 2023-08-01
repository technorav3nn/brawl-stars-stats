"use client";

import { rem, Tabs } from "@mantine/core";
import { IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons-react";

import * as classes from "./StyledTabs.styles";

export function StyledTabsDemo() {
    return (
        <Tabs variant="unstyled" defaultValue="settings" classNames={classes}>
            <Tabs.List grow>
                <Tabs.Tab
                    value="settings"
                    leftSection={<IconSettings style={{ height: rem(16), width: rem(16) }} />}
                >
                    Settings
                </Tabs.Tab>
                <Tabs.Tab
                    value="messages"
                    leftSection={<IconMessageCircle style={{ height: rem(16), width: rem(16) }} />}
                >
                    Messages
                </Tabs.Tab>
                <Tabs.Tab
                    value="gallery"
                    leftSection={<IconPhoto style={{ height: rem(16), width: rem(16) }} />}
                >
                    Gallery{" "}
                </Tabs.Tab>
            </Tabs.List>
        </Tabs>
    );
}
