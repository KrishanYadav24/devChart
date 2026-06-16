import connectDB from "@/lib/mongodb";
import Task from "@/models/Tasks";

export async function GET(){
    try{
        await connectDB();

        const tasks = await Task.find();

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

        const body = await request.json();

        const task = await Task.create(body);

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
        const body = await request.json();
        const { id, status } = body;

        const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });

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
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const status = searchParams.get("status");

        if (id) {
            await Task.findByIdAndDelete(id);
            return Response.json({ message: "Task deleted" });
        }

        if (status) {
            await Task.deleteMany({ status });
            return Response.json({ message: `Tasks in ${status} cleared` });
        }

        return Response.json({ message: "Missing id or status" }, { status: 400 });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Failed to delete" }, { status: 500 });
    }
}
