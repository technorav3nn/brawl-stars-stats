"use client";

import { useRouter } from "next/navigation";
import { forwardRef, useTransition } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
type DynamicLinkProps = {} & Omit<React.HTMLProps<HTMLAnchorElement>, "ref">;

const DynamicLink = forwardRef<HTMLAnchorElement, DynamicLinkProps>(
    ({ href, children, ...props }, ref) => {
        const router = useRouter();
        const [pending, startTransition] = useTransition();

        if (!href) throw new Error("Href is required in DynamicLink");

        return (
            <a
                {...props}
                ref={ref}
                href={href}
                onClick={async (e) => {
                    e.preventDefault();
                    if (pending) return;
                    //   await $revalidatePath(href);

                    startTransition(() => {
                        router.push(href);
                    });
                }}
            >
                {children}
            </a>
        );
    }
);

DynamicLink.displayName = "DynamicLink";

export { DynamicLink };
