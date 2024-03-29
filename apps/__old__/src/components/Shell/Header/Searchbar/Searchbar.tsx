import { DefaultProps, Group, rem, Text, UnstyledButton } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

import { useStyles } from "./Searchbar.styles";

interface SearchControlProps extends DefaultProps, React.ComponentPropsWithoutRef<"button"> {
    onClick(): void;
}

export function Searchbar({ className, ...others }: SearchControlProps) {
    const { classes, cx } = useStyles();

    return (
        <UnstyledButton {...others} className={cx(classes.root, className)}>
            <Group spacing="xs">
                <IconSearch size={rem(14)} stroke={1.5} />
                <Text size="sm" color="dimmed" pr={31}>
                    Search
                </Text>
                <Text weight={700} className={classes.shortcut}>
                    /
                </Text>
            </Group>
        </UnstyledButton>
    );
}
