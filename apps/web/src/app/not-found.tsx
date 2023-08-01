"use client";

import { Button, Group, Text, Title } from "@mantine/core";
import { IconArrowLeft, IconHome } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const BUTTON_STYLES = {
    section: {
        marginRight: 5,
    },
};

export default function NotFound() {
    const router = useRouter();

    const handleClickBack = () => {
        return router.back();
    };

    const handleClickHome = () => {
        return router.push("/");
    };

    return (
        <>
            <Title>404 Not Found</Title>
            <Text>Sorry, the page you are looking for does not exist. 😔</Text>
            <Group>
                <Button
                    leftSection={<IconArrowLeft size={20} />}
                    mt="xl"
                    onClick={handleClickBack}
                    styles={BUTTON_STYLES}
                >
                    Go Back
                </Button>
                <Button
                    leftSection={<IconHome size={20} />}
                    mt="xl"
                    onClick={handleClickHome}
                    styles={BUTTON_STYLES}
                >
                    Go Home
                </Button>
            </Group>
        </>
    );
}
