type TaskCardProps = {
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
};

const TaskCard = ({ id, title, description, priority, status }: TaskCardProps) => {
    const bgClass =
        priority.toLowerCase() === "high"
            ? "bg-red-400"
            : priority.toLowerCase() === "medium"
            ? "bg-yellow-400"
            : "bg-green-400";

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("taskId", id);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className={`flex h-auto w-full self-start flex-col rounded-2xl border-2 border-black overflow-hidden shrink-0 cursor-grab active:cursor-grabbing hover:scale-[1.02] transition-transform ${bgClass}`}
        >
            <div className="bg-black p-3 text-xl font-bold text-teal-200">
                <h2>{title}</h2>
            </div>

            <div className="p-3">
                <div className="rounded-xl border border-black bg-teal-200 p-3 text-sm wrap-break-words">
                    {description}
                </div>
            </div>
        </div>
    );
};


export default TaskCard;
