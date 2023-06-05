import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { cache } from "react";

export const loader: LoaderFunction = async () => {
    const expenses = [
        {
            id: "637f853a8517a37d05c402b5",
            title: "first expense",
            amount: 234,
        },
        {
            id: "637f853a8517a37d05c402b6",
            title: "second expense",
            amount: 500,
        },
    ];

    return new Response(JSON.stringify({ a: Math.random() }), {
        headers: {
            "cache-control": "s-maxage=3600, stale-while-revalidate",
        },
    });
};

export default () => {
    const data = useLoaderData<any>();
    return `${JSON.parse(data).a}`;
};
