"use client";

import Navbar from "@/components/Navbar"
import TaskCard from "@/components/TaskCard";
import React,{ useState, useEffect } from "react";

type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
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

    useEffect(() => {
      fetchTasks();
    }, []);


    return (
      <>
        <Navbar />
        <div className="flex flex-wrap items-start gap-4 m-3">
          {tasks.length > 0 ? (
            tasks.map((task)=>(
              <TaskCard
                key={task._id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                completed={task.completed}
              />
            ))
          ) : (
            <p className="text-teal-200 text-xl m-5">No tasks found. Try creating one!</p>
          )}
        </div>
      </>
    );
}