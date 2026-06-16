import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev_chart";

export async function getAuthUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; username: string };
        return decoded;
    } catch (error) {
        return null;
    }
}
