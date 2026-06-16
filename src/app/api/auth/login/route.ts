import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev_chart";

export async function POST(request: Request) {
    try {
        await connectDB();
        const { username, password } = await request.json();

        const user = await User.findOne({ username });
        if (!user) {
            return Response.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return Response.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });

        const cookieStore = await cookies();
        cookieStore.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return Response.json({ message: "Login successful", username: user.username });
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Login failed" }, { status: 500 });
    }
}
