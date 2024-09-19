import Modalcreate from "./components/modalcreate";

interface Task {
  data: {
    status: boolean;
    message: string;
    resource: {
      data: {
        id: number;
        title: string;
        description: string;
        created_at: string;
        updated_at: string;
      }[];
    };
  };
}
export const revalidate = 0

export default async function Home() {
  const data = await fetch("http://localhost:8000/api/tasks");
  const response: Task = await data.json();
  const tasks = response.data.resource.data;
  // console.log(tasks);
  const dummyTasks = [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description 3",
    }
  ]

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-row w-full px-20 justify-between self-start">
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
        <Modalcreate />
      </header>
      <main className="flex flex-col gap-8 self-start sm:items-start">
        <div className="grid grid-flow-col gap-4">
          {tasks.length != 0 ?
            (tasks.map((task) => (
              <div key={task.id} className="flex flex-col gap-6 border rounded-md border-white p-4">
                <div>
                  <h2>{task.title}</h2>
                  <p>{task.description}</p>
                </div>
                <div className="flex gap-4 items-center self-end flex-col sm:flex-row">
                  <a
                    className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    Edit
                  </a>
                  <button
                    className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base text-red-600 h-10 sm:h-12 px-4 sm:px-5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))) : (
              <>
                <h2 className="text-xl font-bold text-center sm:text-left">
                  Your To Do List
                </h2>
              </>
            )}
        </div>
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
