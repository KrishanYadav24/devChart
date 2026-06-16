import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        await connectDB();
        const { username, password } = await request.json();

        if (!username || username.length < 6) {
            return Response.json({ message: "Username must be at least 6 characters" }, { status: 400 });
        }
        if (!password || password.length < 6) {
            return Response.json({ message: "Password must be at least 6 characters" }, { status: 400 });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return Response.json({ message: "Username already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });

        return Response.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Registration failed" }, { status: 500 });
    }
}
