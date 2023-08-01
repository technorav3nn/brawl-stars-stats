"use server";

import { revalidatePath } from "next/cache";

export async function $revalidatePath(path: string) {
    return revalidatePath(path);
}
