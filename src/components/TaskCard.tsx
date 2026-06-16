type TaskCardProps = {
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    onStatusChange: (id: string, newStatus: string) => void;
};

const TaskCard = ({ id, title, description, priority, status, onStatusChange }: TaskCardProps) => {
    const bgClass =
        priority.toLowerCase() === "high"
            ? "bg-red-400"
            : priority.toLowerCase() === "medium"
            ? "bg-yellow-400"
            : "bg-green-400";

    const statuses = ["To Do", "In Progress", "Done"];

    return (
        <div className={`flex h-auto w-64 self-start flex-col rounded-2xl border-2 border-black overflow-hidden shrink-0 ${bgClass}`}>
            <div className="bg-black p-3 text-xl font-bold text-teal-200">
                <h2>{title}</h2>
            </div>

            <div className="p-3">
                <div className="rounded-xl border border-black bg-teal-200 p-3 text-sm wrap-break-words mb-3">
                    {description}
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold uppercase">Move to:</p>
                    <div className="flex gap-1 flex-wrap">
                        {statuses.filter(s => s !== status).map(s => (
                            <button
                                key={s}
                                onClick={() => onStatusChange(id, s)}
                                className="px-2 py-1 text-[10px] bg-black text-white rounded hover:bg-gray-800 transition-colors"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default TaskCard;
