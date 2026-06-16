import connectDB from "@/lib/mongodb";
import Task from "@/models/Tasks";
import { getAuthUser } from "@/lib/auth";

export async function GET(){
    try{
        await connectDB();
        const user = await getAuthUser();
        if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

        const tasks = await Task.find({ userId: user.userId });

        return Response.json(tasks);

    }catch(error){
        console.log(error);
        return Response.json(
            {message:"Failed to fetch tasks"},
            {status: 500}
        );
    }
}

export async function POST(request: Request){
    try{
        await connectDB();
        const user = await getAuthUser();
        if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const task = await Task.create({ ...body, userId: user.userId });

        return Response.json(task,{status: 201});
    }catch(error){
        console.log(error);
        return Response.json(
            {message:"Failed to create task"},
            {status: 500}
        );
    }
}

export async function PATCH(request: Request) {
    try {
        await connectDB();
        const user = await getAuthUser();
        if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { id, status } = body;

        const updateData: any = { status };

        if (status === "In Progress") {
            updateData.movedToInProgressAt = new Date();
        } else if (status === "Done") {
            updateData.completedAt = new Date();
        }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, userId: user.userId },
            updateData,
            { returnDocument: 'after' }
        );

        if (!updatedTask) {
            return Response.json({ message: "Task not found" }, { status: 404 });
        }

        return Response.json(updatedTask);
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Failed to update task" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await connectDB();
        const user = await getAuthUser();
        if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const status = searchParams.get("status");

        if (id) {
            await Task.findOneAndDelete({ _id: id, userId: user.userId });
            return Response.json({ message: "Task deleted" });
        }

        if (status) {
            await Task.deleteMany({ status, userId: user.userId });
            return Response.json({ message: `Tasks in ${status} cleared` });
        }

        return Response.json({ message: "Missing id or status" }, { status: 400 });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Failed to delete" }, { status: 500 });
    }
}
