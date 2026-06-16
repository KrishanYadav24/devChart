type TaskCardProps = {
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    onDelete: (id: string) => void;
};

const TaskCard = ({ id, title, description, priority, status, onDelete }: TaskCardProps) => {
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
            className={`flex h-auto w-full flex-col rounded-2xl border-2 border-black overflow-hidden shrink-0 cursor-grab active:cursor-grabbing hover:scale-[1.02] transition-transform relative group ${bgClass}`}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(id);
                }}
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
            >
                ✕
            </button>
            <div className="bg-black p-3 text-xl font-bold text-teal-200 pr-10">
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
