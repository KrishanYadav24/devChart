import React, { useState, useEffect } from "react";

type TaskCardProps = {
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt: string;
    movedToInProgressAt?: string;
    completedAt?: string;
    onDelete: (id: string) => void;
};

const TaskCard = ({ id, title, description, priority, status, createdAt, movedToInProgressAt, completedAt, onDelete }: TaskCardProps) => {
    const [timer, setTimer] = useState("");

    const bgClass =
        priority.toLowerCase() === "high"
            ? "bg-red-400"
            : priority.toLowerCase() === "medium"
            ? "bg-yellow-400"
            : "bg-green-400";

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("taskId", id);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (status === "In Progress" && movedToInProgressAt) {
            const updateTimer = () => {
                const now = new Date();
                const start = new Date(movedToInProgressAt);
                const diff = Math.floor((now.getTime() - start.getTime()) / 1000);

                const hours = Math.floor(diff / 3600);
                const minutes = Math.floor((diff % 3600) / 60);
                const seconds = diff % 60;

                setTimer(`${hours}h ${minutes}m ${seconds}s`);
            };

            updateTimer();
            interval = setInterval(updateTimer, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [status, movedToInProgressAt]);

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleString();
    };

    const calculateTotalTime = (start: string, end: string) => {
        const s = new Date(start).getTime();
        const e = new Date(end).getTime();
        const diff = Math.floor((e - s) / 1000);

        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);

        return `${hours}h ${minutes}m`;
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

            <div className="p-3 flex flex-col gap-2">
                <div className="rounded-xl border border-black bg-teal-200 p-3 text-sm wrap-break-words">
                    {description}
                </div>

                <div className="text-[10px] font-bold text-black bg-white/30 rounded-lg p-2 border border-black/20">
                    {status === "To Do" && (
                        <div>Created: {formatTime(createdAt)}</div>
                    )}

                    {status === "In Progress" && (
                        <div className="flex flex-col gap-1">
                            <div>Working for: <span className="text-sm font-mono">{timer}</span></div>
                            <div className="opacity-70 text-[8px]">Started: {formatTime(movedToInProgressAt || "")}</div>
                        </div>
                    )}

                    {status === "Done" && completedAt && (
                        <div className="flex flex-col gap-1">
                            <div>Created: {formatTime(createdAt)}</div>
                            <div>Completed: {formatTime(completedAt)}</div>
                            <div className="mt-1 pt-1 border-t border-black/10 font-black text-xs">
                                TOTAL TIME: {calculateTotalTime(createdAt, completedAt)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default TaskCard;
