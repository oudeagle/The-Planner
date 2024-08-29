import React, { useEffect, useState } from "react"
import '../App.css'

export function Completed() {
  var [tasks, setTasks] = useState([])
  useEffect(() => {
    fetch('http://localhost:2000/completed')
      .then(response => response.json())
      .then(data => {
        const newTasks = data.map((item, index) => ({
          id: `task${tasks.length + index + 1}`,
          name: item.name,
          completed: item.completed
        }))
        setTasks(newTasks)
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, [])
  return (

    <>
      <h1 className="text-3xl font-bold text-center py-4">The Planner</h1>
      <div className='flex flex-wrap justify-around items-center py-3'>
        <a href='/' className='flex justify-center items-center font-semibold hover:text-orange-800 py-3'>Current Tasks</a>
      </div>
      <div className='flex flex-wrap justify-around items-center py-3'>
        <div className='container mx-auto px-4 items-center py-20 my-10 bg-gradient-to-b from-purple-300 to-purple-800 rounded-md'>
          <h2 className='text-xl font-bold py-5 ml-10'>Completed Tasks:</h2>
          <div className='tasks-grid'>
            {tasks.map((item) => (
              <>
                <div className='container rounded w-60 h-20 bg-gray-700 shadow-lg mx-auto m-7 p-5 flex items-center justify-center'>
                  <label htmlFor={item.id} className='px-2 text-white'>{item.name}</label>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
