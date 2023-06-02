import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    res.status(200).json({ message: "Hello World" });
};

export default handler;
