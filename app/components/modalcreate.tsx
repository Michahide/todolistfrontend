'use client'

import { useState } from 'react';


const Modalcreate = ({onTaskCreated} : {onTaskCreated : () => Promise<void>}) => {
    const [show, setShow] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:8000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        });

        if (response.ok) {
            // Handle successful response
            console.log('Task created successfully');
            setShow(false);
            setCreateError(false);
            await onTaskCreated();
            setTitle('');
            setDescription('');
        } else {
            // Handle error response
            console.error('Failed to create task');
            setCreateError(true);
        }
    };

    return (
        <div className="place-self-center mt-4 md:mt-auto md:place-self-auto">
            <button
                className="rounded-lg border border-solid border-transparent transition-colors flex flex-row items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-blue-500 dark:hover:text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 self-end"
                title="Create New Task"
                onClick={() => setShow(prev => !prev)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>Create</span>
            </button>
            {show ? (
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-800 bg-opacity-75" onClick={() => setShow(false)}>
                    <div className="relative md:w-1/2 my-6 mx-auto max-w-3xl" onClick={(e) => e.stopPropagation()}>
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline focus:outline-none">
                            <div className="flex items-center justify-between p-5 rounded-t ">
                                <h3 className="text-2xl font=semibold">Create new task</h3>
                                <button
                                    className="bg-transparent border-0 text-black float-right"
                                    title='close'
                                    type='button'
                                    onClick={() => { setShow(false); setCreateError(false); }}
                                >
                                    <span className="text-white opacity-7 h-6 w-6 text-xl py-0 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            {createError ?
                                <div className='flex relative w-auto text-wrap p-5 text-sm'>
                                    <div className="flex flex-row items-center text-sm p-4 bg-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                        </svg>
                                        <span>{"\u00A0"}Something error. Please check your input. Make sure you fill the title input</span>
                                    </div>
                                </div>
                                : null}
                            <form className="shadow-md rounded px-8 pt-6 pb-8 w-full" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                                <label className="block text-sm font-bold mb-1" htmlFor='title' >
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                    name="title"
                                    title="title"
                                    placeholder="Enter your task title"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    maxLength={100}
                                />
                                <label className="block text-sm font-bold mb-1" htmlFor="description">
                                    Description
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                    name="description"
                                    title="description"
                                    placeholder="Enter your task description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </form>
                            <div className="flex items-center justify-end p-6 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    onClick={() => { setShow(false); setCreateError(false); }}
                                >
                                    Close
                                </button>
                                <button
                                    className="text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    onClick={handleSubmit}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSubmit();
                                        }
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>) : null}
        </div>
    );
};

export default Modalcreate;
