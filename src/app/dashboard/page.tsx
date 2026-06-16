"use client";

import Navbar from "@/components/Navbar"
import TaskCard from "@/components/TaskCard";
import React,{ useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
  movedToInProgressAt?: string;
  completedAt?: string;
};

export default function Home(){
    const [tasks,setTasks] = useState<Task[]>([]);
    const router = useRouter();

    async function fetchTasks() {
      try {
        const response = await fetch("/api/tasks");
        if (response.status === 401) {
          router.push("/");
          return;
        }
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    // Optimistic Update: Move task instantly in UI
    async function handleStatusChange(id: string, newStatus: string) {
      const originalTasks = [...tasks];

      // Update local state immediately
      setTasks(prev => prev.map(t =>
        t._id === id ? { ...t, status: newStatus,
          movedToInProgressAt: newStatus === "In Progress" ? new Date().toISOString() : t.movedToInProgressAt,
          completedAt: newStatus === "Done" ? new Date().toISOString() : t.completedAt
        } : t
      ));

      try {
        const response = await fetch("/api/tasks", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: newStatus }),
        });
        if (!response.ok) throw new Error("Update failed");
      } catch (error) {
        setTasks(originalTasks); // Revert on failure
        console.error("Update error:", error);
      }
    }

    async function deleteTask(id: string) {
      setTasks(prev => prev.filter(t => t._id !== id)); // Optimistic delete
      try {
        await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
      } catch (error) {
        fetchTasks(); // Reload on error
      }
    }

    async function clearColumn(status: string) {
      if (!confirm(`Clear all tasks in "${status}"?`)) return;
      setTasks(prev => prev.filter(t => t.status !== status)); // Optimistic clear
      try {
        await fetch(`/api/tasks?status=${status}`, { method: "DELETE" });
      } catch (error) {
        fetchTasks();
      }
    }

    useEffect(() => { fetchTasks(); }, []);

    // Efficiently categorize tasks in one pass
    const columns = ["To Do", "In Progress", "Done"];
    const categorizedTasks = useMemo(() => {
      return columns.reduce((acc, col) => {
        acc[col] = tasks.filter(t => (t.status || "To Do") === col);
        return acc;
      }, {} as Record<string, Task[]>);
    }, [tasks]);

    const handleDragOver = (e: React.DragEvent) => e.preventDefault();
    const handleDrop = (e: React.DragEvent, status: string) => {
      const taskId = e.dataTransfer.getData("taskId");
      if (taskId) handleStatusChange(taskId, status);
    };

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="flex justify-between items-stretch gap-6 p-6 min-h-[calc(100vh-80px)] overflow-x-auto">
          {columns.map((column) => (
            <div
              key={column}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column)}
              className="flex-1 flex flex-col gap-4 min-w-[300px] bg-gray-800 p-4 rounded-2xl border border-gray-700 relative group/col shadow-xl"
            >
              <button
                onClick={() => clearColumn(column)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 opacity-0 group-hover/col:opacity-100 transition-opacity font-bold text-xl z-20"
              >✕</button>

              <h2 className="text-2xl font-black text-teal-200 border-b border-gray-700 pb-2 text-center">{column}</h2>

              <div className="flex-1 flex flex-col gap-4 min-h-[200px]">
                {categorizedTasks[column].map((task) => (
                  <TaskCard
                    key={task._id}
                    {...task}
                    id={task._id}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
