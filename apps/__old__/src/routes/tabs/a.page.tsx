import { Button } from "@mantine/core";
import { Page } from "rakkasjs";

const PageE: Page = ({ meta }) => <Button>Tab 2 {meta.title as string}</Button>;

PageE.preload = () => {
    return {
        meta: {
            title: "Tab  2 FROM SERVER ",
        },
    };
};
export default PageE;
