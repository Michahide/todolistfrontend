"use client"
import { useState, useEffect } from "react";
import Modalcreate from "./components/modalcreate";
import Modalupdate from "./components/modalupdate";
import { Task } from "./Task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:8000/api/tasks", { next: { revalidate: 0 } });
    const data = await response.json();
    setTasks(data.data.resource.data);
    setLoading(false);
  };

  const deleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col md:flex-row w-full px-20 md:justify-between self-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          <a
            className="text-[#f30010] dark:text-[#ff0026] hover:underline hover:underline-offset-4"
            href="https://dipa.co.id"
            target="_blank"
            rel="noopener noreferrer"
          >
            DIPA {" "}
          </a>
          To Do List
        </h1>
        <Modalcreate onTaskCreated={fetchTasks} />
      </header>
      <main className="flex flex-col gap-8 self-start sm:items-start">
        {loading ? <h2 className="text-xl font-bold text-center sm:text-left">
          Loading your tasks...
        </h2> : (
          <>
            <h2 className="text-xl font-bold text-center sm:text-left">
              Your To Do List ({tasks.length} task(s))
            </h2>
            {tasks.length != 0 ?
              (
                <>
                  <div className="grid md:grid-cols-3 gap-4">
                    {tasks.map((task) => (
                      <div key={task.id} className="grid gap-6 border rounded-md border-white p-4">
                        <div>
                          <h2>{task.title}</h2>
                          <p>{task.description}</p>
                        </div>
                        <div className="flex gap-4 md:items-center md:justify-end self-end flex-row w-full">
                          <Modalupdate taskId={task.id} onTaskUpdated={fetchTasks} />
                          <button
                            className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-red-600 dark:hover:text-white text-sm sm:text-base text-red-600 h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
                            title="Delete Task"
                            onClick={() => deleteTask(task.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>) : (
                <>
                  <h2 className="text-xl font-bold text-center sm:text-left">
                    There is no task. Create one!
                  </h2>
                </>
              )}
          </>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          Michael Mervin Ruswan
        </div>
      </footer>
    </div>
  );
}
