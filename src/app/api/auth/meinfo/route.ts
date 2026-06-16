import { getAuthUser } from "@/lib/auth";

export async function GET() {
    console.log("ME ROUTE HIT");
    const user = await getAuthUser();

    if (!user) {
        return new Response(JSON.stringify({ message: "No session" }), { status: 401 });
    }

    return new Response(JSON.stringify({ username: user.username }), { status: 200 });
}
