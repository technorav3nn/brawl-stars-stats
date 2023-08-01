import { Header } from "~/components/Shell/Header";
import { RouterProgress } from "~/components/Shell/RouterProgress/RouterProgress";

// export function headers(): ResponseHeadersProps {
//     return { throttleRenderStream: true };
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <RouterProgress />
            <Header />
            {children}
        </>
    );
}
