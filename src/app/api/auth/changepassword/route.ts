import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getAuthUser } from "@/lib/auth";

export async function POST(request: Request) {
    // FORCE SUCCESS FOR DEBUGGING
    // return new Response(JSON.stringify({ message: "DEBUG SUCCESS" }), { status: 200 });

    try {
        await connectDB();
        const user = await getAuthUser();

        if (!user) {
            return new Response(JSON.stringify({ message: "Session missing" }), { status: 401 });
        }

        const { currentPassword, newPassword } = await request.json();

        const dbUser = await User.findById(user.userId);
        if (!dbUser) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 401 });
        }

        const isMatch = await bcrypt.compare(currentPassword, dbUser.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ message: "Wrong password" }), { status: 401 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(user.userId, { password: hashedPassword });

        return new Response(JSON.stringify({ message: "Password updated" }), { status: 200 });
    } catch (error) {
        console.error("API ERROR:", error);
        return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}
