import { Box } from "@mantine/core";

export function ScrollableGroup({ children }: React.PropsWithChildren) {
    return (
        <Box
            sx={() => ({
                display: "flex",
                flexWrap: "nowrap",
                overflowX: "auto",
            })}
        >
            {children}
        </Box>
    );
}
