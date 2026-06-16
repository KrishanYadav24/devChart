"use client";

import Navbar from "@/components/Navbar"
import TaskCard from "@/components/TaskCard";
import React,{ useState, useEffect } from "react";

type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
};

export default function Home(){

    const [tasks,setTasks] = useState<Task[]>([]);

    async function fetchTasks() {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    async function handleStatusChange(id: string, newStatus: string) {
      try {
        const response = await fetch("/api/tasks", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: newStatus }),
        });
        if (response.ok) {
          fetchTasks(); // Refresh tasks
        }
      } catch (error) {
        console.error("Update error:", error);
      }
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, status: string) => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData("taskId");
      if (taskId) {
        handleStatusChange(taskId, status);
      }
    };

    useEffect(() => {
      fetchTasks();
    }, []);

    const columns = ["To Do", "In Progress", "Done"];

    return (
      <>
        <Navbar />
        <div className="flex flex-row gap-6 p-6 overflow-x-auto min-h-screen bg-gray-900">
          {columns.map((column) => (
            <div
              key={column}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column)}
              className="flex flex-col gap-4 min-w-[280px] bg-gray-800 p-4 rounded-2xl border border-gray-700"
            >
              <h2 className="text-2xl font-bold text-teal-200 border-b border-gray-700 pb-2">{column}</h2>
              <div className="flex flex-col gap-4 min-h-[100px]">
                {tasks
                  .filter((task) => (task.status || "To Do") === column)
                  .map((task) => (
                    <TaskCard
                      key={task._id}
                      id={task._id}
                      title={task.title}
                      description={task.description}
                      priority={task.priority}
                      status={task.status || "To Do"}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </>
    );
}