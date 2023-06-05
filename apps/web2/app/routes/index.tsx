import { Button, useMantineColorScheme } from "@mantine/core";
import { V2_MetaFunction, json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
    return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export const loader = () => {
    return json({ message: "Hello from the server!" });
};

export default function Index() {
    const data = useLoaderData<typeof loader>();
    const colorScheme = useMantineColorScheme();

    return (
        <>
            <Button onClick={() => colorScheme.toggleColorScheme()}>Colors</Button>
        </>
    );
}
